import type { IBlogPost } from "../types/index.d.ts";

export const getBlogPosts = async (): Promise<IBlogPost[]> => {
  const blogPosts = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/blog/main/api.json"
    )
  ).json()) as IBlogPost[];
  return blogPosts.filter((post) => !post.attributes?.draft);
};
