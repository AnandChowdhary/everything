import type { IVersion, TimelineVersion } from "../types/index.d.ts";

export const transformVersions = (versions: IVersion[]): TimelineVersion[] => {
  return versions.map((version) => ({
    date: version.date,
    type: "version",
    url: `https://anandchowdhary.com/versions/${new Date(
      version.date
    ).getUTCFullYear()}/${version.slug.replace(".md", "")}`,
    source: `https://anandchowdhary.github.io/versions/versions/${new Date(
      version.date
    ).getUTCFullYear()}/${version.slug.replace(".md", "")}`,
    title: version.title,
    data: undefined,
  }));
};

