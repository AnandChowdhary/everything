import { slugify } from "@sindresorhus/slugify";
import type { IVideo, TimelineVideo } from "../types/index.d.ts";

export const transformVideos = (videos: IVideo[]): TimelineVideo[] => {
  return videos.map((video) => ({
    date: video.date,
    type: "video",
    url: `https://anandchowdhary.com/videos/${new Date(
      video.date
    ).getUTCFullYear()}/${slugify(video.title)}`,
    source: `https://github.com/AnandChowdhary/everything/blob/main/data/videos.json`,
    title: video.title,
    data: {
      href: video.href,
      city: video.city,
      country: video.country,
      img: video.img,
      publisher: video.publisher,
      duration: video.duration,
    },
  }));
};

