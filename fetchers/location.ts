import type { ILocation } from "../types/index.d.ts";

export const getLocation = async (): Promise<ILocation[]> => {
  const locations = (await (
    await fetch(
      "https://anandchowdhary.github.io/location/history-countries.json"
    )
  ).json()) as ILocation[];
  return locations;
};
