import type { IProject, TimelineProject } from "../types/index.d.ts";

export const transformProjects = (projects: IProject[]): TimelineProject[] => {
  return projects.map((project) => ({
    date: project.date,
    type: "project",
    url: `https://anandchowdhary.com/projects/${new Date(
      project.date
    ).getUTCFullYear()}/${project.slug.replace(".md", "")}`,
    source: `https://anandchowdhary.github.io/projects/projects/${new Date(
      project.date
    ).getUTCFullYear()}/${project.slug.replace(".md", "")}`,
    title: project.title,
    data: {
      description: project.attributes?.intro ?? project.excerpt,
      tags: [
        ...(project.attributes?.work ?? []),
        ...(project.attributes?.tools ?? []),
        ...(project.attributes?.stack ?? []),
      ],
      collaborators: project.attributes?.collaborators ?? [],
      icon: project.attributes?.icon
        ? {
            url: `https://raw.githubusercontent.com/AnandChowdhary/projects/main${project.attributes.icon}`,
            requiresBackground: !!project.attributes?.icon_bg,
          }
        : undefined,
      image: project.attributes?.img_src
        ? {
            url: `https://raw.githubusercontent.com/AnandChowdhary/projects/main${
              project.attributes.img_src
            }${
              project.attributes?.img_type
                ? `.${project.attributes.img_type}`
                : ""
            }`,
            attachment:
              project.attributes?.style === "padded" ? "padded" : "cover",
            color: project.attributes?.bg,
          }
        : undefined,
    },
  }));
};

