import { readFile } from "fs/promises";
import type { IVideo } from "../types/index.d.ts";

export const getVideos = async () => {
  const videos = JSON.parse(
    await readFile("./data/videos.json", "utf-8")
  ) as IVideo[];
  return videos;
};

