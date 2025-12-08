import slugify from "slugify";
import type { IHackerNews, TimelineHackerNews } from "../types/index.d.ts";

export const transformHackerNews = (
  items: IHackerNews[]
): TimelineHackerNews[] => {
  return items.map((item) => ({
    date: item.date,
    type: "hacker-news",
    url: `https://anandchowdhary.com/hacker-news/${new Date(
      item.date
    ).getUTCFullYear()}/${slugify(item.title, {
      lower: true,
    })}`,
    source: item.url,
    title: item.title,
    data: {
      points: item.points,
      comments: item.comments,
      url: item.url,
      id: item.id,
    },
  }));
};

