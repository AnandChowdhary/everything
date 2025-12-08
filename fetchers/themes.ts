import type { ITheme } from "../types/index.d.ts";

export const getThemes = async (): Promise<ITheme[]> => {
  const themes = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/themes/main/api.json"
    )
  ).json()) as ITheme[];
  return themes;
};

