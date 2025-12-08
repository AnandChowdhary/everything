import * as cheerio from "cheerio";
import type { IHackerNews } from "../types/index.d.ts";

export const getHackerNewsFavorites = async (): Promise<IHackerNews[]> => {
  const response = await fetch(
    "https://news.ycombinator.com/favorites?id=anandchowdhary"
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const items: IHackerNews[] = [];
  const rows = $("tr.athing.submission");

  rows.each((_, element) => {
    const $row = $(element);
    const $nextRow = $row.next();

    // Extract title and URL
    const $titleLink = $row.find("td.title span.titleline > a").first();
    const title = $titleLink.text().trim();
    let url = $titleLink.attr("href") || "";
    const id = $row.attr("id") || "";

    // If URL is relative (item?id=...), it's a discussion post
    if (url.startsWith("item?id=")) {
      url = `https://news.ycombinator.com/${url}`;
    } else if (url && !url.startsWith("http")) {
      url = `https://news.ycombinator.com/${url}`;
    }

    // Extract points from the next row
    const $subtext = $nextRow.find("td.subtext");
    const pointsText = $subtext.find("span.score").text();
    const points = pointsText ? parseInt(pointsText.replace(/\D/g, ""), 10) : 0;

    // Extract comments - look for the last link in subtext that contains "comment"
    let comments = 0;
    $subtext.find("a").each((_, link) => {
      const text = $(link).text();
      if (text.includes("comment")) {
        const match = text.match(/(\d+)/);
        if (match) {
          comments = parseInt(match[1], 10);
        }
      }
    });

    // Extract date from the age span
    const $age = $subtext.find("span.age");
    let date = "";

    // The title attribute contains the ISO timestamp
    const ageTitle = $age.attr("title");
    if (ageTitle) {
      // Parse the timestamp from title attribute (format: "2025-11-15T16:27:49 1763224069")
      const timestampMatch = ageTitle.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/);
      if (timestampMatch) {
        date = new Date(timestampMatch[1]).toISOString().substring(0, 10);
      } else {
        // Fallback: try parsing as ISO string
        try {
          date = new Date(ageTitle).toISOString().substring(0, 10);
        } catch {
          date = new Date().toISOString().substring(0, 10);
        }
      }
    } else {
      // Fallback: parse relative time from text (e.g., "22 days ago", "on Feb 25, 2022")
      const ageText = $age.text();
      const now = new Date();
      
      // Check for "on [Date]" format (e.g., "on Feb 25, 2022")
      const onDateMatch = ageText.match(/on (\w+ \d+, \d{4})/);
      if (onDateMatch) {
        try {
          date = new Date(onDateMatch[1]).toISOString().substring(0, 10);
        } catch {
          // Fall through to relative time parsing
        }
      }
      
      // If no date found, try relative time (e.g., "22 days ago")
      if (!date) {
        const match = ageText.match(/(\d+)\s*(hour|day|minute|second)s?\s*ago/i);
        if (match) {
          const value = parseInt(match[1], 10);
          const unit = match[2].toLowerCase();
          const dateObj = new Date(now);
          if (unit === "hour") {
            dateObj.setHours(dateObj.getHours() - value);
          } else if (unit === "day") {
            dateObj.setDate(dateObj.getDate() - value);
          } else if (unit === "minute") {
            dateObj.setMinutes(dateObj.getMinutes() - value);
          } else if (unit === "second") {
            dateObj.setSeconds(dateObj.getSeconds() - value);
          }
          date = dateObj.toISOString().substring(0, 10);
        } else {
          date = now.toISOString().substring(0, 10);
        }
      }
    }

    if (title && id) {
      items.push({
        title,
        points,
        date,
        comments,
        url,
        id,
      });
    }
  });

  return items;
};

