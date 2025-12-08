import type { IEvent } from "../types/index.d.ts";

export const getEvents = async (): Promise<IEvent[]> => {
  const events = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/events/main/api.json"
    )
  ).json()) as IEvent[];
  return events;
};

