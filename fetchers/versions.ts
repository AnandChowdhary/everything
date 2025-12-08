import type { IVersion } from "../types/index.d.ts";

export const getVersions = async (): Promise<IVersion[]> => {
  const versions = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/versions/main/api.json"
    )
  ).json()) as IVersion[];
  return versions;
};

