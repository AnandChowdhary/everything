import type { IBlogPost, TimelineBlogPost } from "../types/index.d.ts";

export const transformBlogPosts = (
  blogPosts: IBlogPost[]
): TimelineBlogPost[] => {
  return blogPosts.map((post) => ({
    date: post.date,
    type: "blog-post",
    url: `https://anandchowdhary.com/blog/${new Date(
      post.date
    ).getUTCFullYear()}/${post.slug.replace(".md", "")}`,
    source: `https://anandchowdhary.github.io/blog/blog/${new Date(
      post.date
    ).getUTCFullYear()}/${post.slug.replace(".md", "")}`,
    title: post.title,
    data: { words: post.words, excerpt: post.excerpt },
  }));
};

