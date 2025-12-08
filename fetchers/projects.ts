import type { IProject } from "../types/index.d.ts";

export const getProjects = async (): Promise<IProject[]> => {
  const projects = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/projects/main/api.json"
    )
  ).json()) as IProject[];
  return projects;
};

