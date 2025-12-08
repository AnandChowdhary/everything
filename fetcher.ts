import { writeFile } from "fs/promises";
import { getBlogPosts } from "./fetchers/blog-posts";
import { getBooks } from "./fetchers/books";
import { getEvents } from "./fetchers/events";
import { getHackerNewsFavorites } from "./fetchers/hacker-news";
import { getLifeEvents } from "./fetchers/life-events";
import { getLocation } from "./fetchers/location";
import { getOkrs } from "./fetchers/okrs";
import { getPress } from "./fetchers/press";
import { getProjects } from "./fetchers/projects";
import { getRepos } from "./fetchers/repos";
import { getThemes } from "./fetchers/themes";
import { getVersions } from "./fetchers/versions";
import { getVideos } from "./fetchers/videos";
import { transformBlogPosts } from "./transformers/blog-posts";
import { transformBooks } from "./transformers/books";
import { transformEvents } from "./transformers/events";
import { transformHackerNews } from "./transformers/hacker-news";
import { transformLifeEvents } from "./transformers/life-events";
import { transformLocation } from "./transformers/location";
import { transformOkrs } from "./transformers/okrs";
import {
  transformAwards,
  transformPodcastInterviews,
  transformPressFeatures,
} from "./transformers/press";
import { transformProjects } from "./transformers/projects";
import { transformRepos } from "./transformers/repos";
import { transformThemes } from "./transformers/themes";
import { transformVersions } from "./transformers/versions";
import { transformVideos } from "./transformers/videos";
import type { Timeline } from "./types/index.d.ts";

export const generate = async () => {
  const press = await getPress();
  const okrs = await getOkrs();

  const timeline: Timeline = [
    ...transformOkrs(okrs),
    ...transformEvents(await getEvents()),
    ...transformProjects(await getProjects()),
    ...transformVersions(await getVersions()),
    ...transformBlogPosts(await getBlogPosts()),
    ...transformThemes(await getThemes()),
    ...transformBooks(await getBooks()),
    ...transformLocation(await getLocation()),
    ...transformLifeEvents(await getLifeEvents()),
    ...transformVideos(await getVideos()),
    ...transformAwards(press.awards),
    ...transformPodcastInterviews(press.podcasts),
    ...transformPressFeatures(press.features),
    ...transformRepos(await getRepos()),
    ...transformHackerNews(await getHackerNewsFavorites()),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  await writeFile(
    "api.json",
    JSON.stringify(timeline, null, 2) + "\n",
    "utf-8"
  );
};

await generate();
