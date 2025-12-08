import slugify from "@sindresorhus/slugify";
import type { ILocation, TimelineTravel } from "../types/index.d.ts";

export const transformLocation = (locations: ILocation[]): TimelineTravel[] => {
  return locations.map((location) => ({
    date: location.date,
    type: "travel",
    url: `https://anandchowdhary.com/location/${new Date(
      location.date
    ).getUTCFullYear()}/${slugify(location.label)}`,
    source: `https://github.com/AnandChowdhary/location/commit/${location.hash}`,
    title: location.label,
    data: {
      hash: location.hash,
      approximateCoordinates: location.coordinates,
      label: location.label,
      countryCode: location.country_code,
    },
  }));
};

