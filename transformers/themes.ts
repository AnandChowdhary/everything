import type { ITheme, TimelineTheme } from "../types/index.d.ts";

export const transformThemes = (themes: ITheme[]): TimelineTheme[] => {
  return themes.map((theme) => ({
    date: theme.date,
    type: "theme",
    url: `https://anandchowdhary.com/themes/${new Date(
      theme.date
    ).getUTCFullYear()}`,
    source: `https://anandchowdhary.github.io/themes/themes/${new Date(
      theme.date
    ).getUTCFullYear()}/${theme.slug.replace(".md", "")}`,
    title: theme.title,
    data: {
      year: new Date(theme.date).getUTCFullYear(),
      description: theme.excerpt,
    },
  }));
};

