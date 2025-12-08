import { slugify } from "@sindresorhus/slugify";
import type { ILifeEvent, TimelineLifeEvent } from "../types/index.d.ts";

export const transformLifeEvents = (
  lifeEvents: ILifeEvent[]
): TimelineLifeEvent[] => {
  return lifeEvents.map((event) => ({
    date: event.date,
    type: "life-event",
    url: `https://anandchowdhary.com/life/${new Date(
      event.date
    ).getUTCFullYear()}/${slugify(event.title)}`,
    source: `https://github.com/AnandChowdhary/everything/blob/main/data/life-events.json`,
    title: event.title,
    data: { description: event.description },
  }));
};

