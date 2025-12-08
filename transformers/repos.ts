import type { IRepo, TimelineOpenSourceProject } from "../types/index.d.ts";

export const transformRepos = (
  repos: IRepo[]
): TimelineOpenSourceProject[] => {
  return repos.map((repo) => ({
    date: repo.created_at,
    type: "open-source-project",
    title: repo.full_name,
    url: `https://anandchowdhary.com/open-source/${new Date(
      repo.created_at
    ).getUTCFullYear()}/${repo.full_name.split("/")[1]}`,
    source: repo.html_url,
    data: {
      description: repo.description,
      stars: repo.stargazers_count,
      issues: repo.open_issues,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      topics: repo.topics ?? [],
      language: repo.language,
      languageColor: repo.language_color,
      openGraphImageUrl: repo.open_graph_image_url,
    },
  }));
};

