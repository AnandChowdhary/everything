import { readFile } from "fs/promises";
import type { IHackerNews } from "../types/index.d.ts";

const HACKER_NEWS_ITEM_API_URL = "https://hacker-news.firebaseio.com/v0/item";

interface HackerNewsSourceItem {
  id: string;
  url?: string;
}

interface HackerNewsApiItem {
  id?: number;
  title?: string;
  score?: number;
  descendants?: number;
  time?: number;
  url?: string;
}

const getHackerNewsItemUrl = (id: string) =>
  `https://news.ycombinator.com/item?id=${id}`;

const getDateFromUnixSeconds = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substring(0, 10);

const getHackerNewsSourceItems = async (): Promise<HackerNewsSourceItem[]> =>
  JSON.parse(
    await readFile("./data/hacker-news.json", "utf-8")
  ) as HackerNewsSourceItem[];

export const getHackerNewsFavorites = async (): Promise<IHackerNews[]> => {
  const sourceItems = await getHackerNewsSourceItems();

  return Promise.all(
    sourceItems.map(async (sourceItem) => {
      const response = await fetch(
        `${HACKER_NEWS_ITEM_API_URL}/${sourceItem.id}.json`
      );
      if (!response.ok) {
        throw new Error(`Unable to fetch Hacker News item ${sourceItem.id}`);
      }

      const item = (await response.json()) as HackerNewsApiItem | null;
      if (
        !item?.title ||
        typeof item.id !== "number" ||
        typeof item.time !== "number"
      ) {
        throw new Error(`Invalid Hacker News item ${sourceItem.id}`);
      }

      return {
        title: item.title,
        points: item.score ?? 0,
        date: getDateFromUnixSeconds(item.time),
        comments: item.descendants ?? 0,
        url: item.url ?? sourceItem.url ?? getHackerNewsItemUrl(sourceItem.id),
        id: String(item.id),
      };
    })
  );
};
