import type { IEvent, TimelineEvent } from "../types/index.d.ts";

export const transformEvents = (events: IEvent[]): TimelineEvent[] => {
  return events.map((event) => ({
    date: event.date,
    type: "event",
    url: `https://anandchowdhary.com/events/${new Date(
      event.date
    ).getUTCFullYear()}/${event.slug.replace(".md", "")}`,
    source: `https://anandchowdhary.github.io/events/events/${new Date(
      event.date
    ).getUTCFullYear()}/${event.slug.replace(".md", "")}`,
    title: event.title,
    data: {
      remote: !!event.attributes.remote,
      country: event.attributes.country,
      city: event.attributes.city,
      venue: event.attributes.venue,
      coordinates: event.attributes.coordinates,
      video: event.attributes.video,
      event: event.attributes.event,
      talk: event.attributes.talk,
      slides: event.attributes.slides,
      embed: event.attributes.embed,
    },
  }));
};

