import type { IHackerNews, TimelineHackerNews } from "../types/index.d.ts";

export const transformHackerNews = (
  items: IHackerNews[]
): TimelineHackerNews[] => {
  return items.map((item) => ({
    date: item.date,
    type: "hacker-news",
    url: `https://news.ycombinator.com/item?id=${item.id}`,
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

