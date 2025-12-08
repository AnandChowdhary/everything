import type { IRepo } from "../types/index.d.ts";

export const getRepos = async (): Promise<IRepo[]> => {
  const repos = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/featured/HEAD/repos.json"
    )
  ).json()) as (IRepo & { open_graph_image_url?: string })[];

  for (const repo of repos) {
    const [owner, slug] = repo.full_name.split("/");
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      body: JSON.stringify({
        query: `
          {
            repository(owner: "${owner}", name: "${slug}") {  
              openGraphImageUrl
            }
          }
        `,
      }),
    });
    const json = (await res.json()) as {
      data?: { repository?: { openGraphImageUrl?: string } };
    };
    repo.open_graph_image_url = json?.data?.repository?.openGraphImageUrl;
  }

  return repos;
};

