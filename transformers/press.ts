import slugify from "slugify";
import type {
  IPress,
  TimelineAward,
  TimelinePodcastInterview,
  TimelinePressFeature,
} from "../types/index.d.ts";

export const transformAwards = (awards: IPress["awards"]): TimelineAward[] => {
  return awards.map((award) => ({
    date: award.date,
    type: "award",
    url: `https://anandchowdhary.com/press/${new Date(
      award.date
    ).getUTCFullYear()}/${slugify(award.publisher, {
      lower: true,
    })}`,
    source: `https://github.com/AnandChowdhary/everything/blob/main/data/press.json`,
    title: award.title,
    data: { href: award.href, publisher: award.publisher },
  }));
};

export const transformPodcastInterviews = (
  podcasts: IPress["podcasts"]
): TimelinePodcastInterview[] => {
  return podcasts.map((interview) => ({
    date: interview.date,
    type: "podcast-interview",
    url: `https://anandchowdhary.com/press/${new Date(
      interview.date
    ).getUTCFullYear()}/${slugify(interview.publisher, {
      lower: true,
    })}`,
    source: `https://github.com/AnandChowdhary/everything/blob/main/data/press.json`,
    title: interview.title,
    data: {
      href: interview.href,
      publisher: interview.publisher,
      embed: interview.embed,
    },
  }));
};

export const transformPressFeatures = (
  features: IPress["features"]
): TimelinePressFeature[] => {
  return features.map((article) => ({
    date: article.date,
    type: "press-feature",
    url: `https://anandchowdhary.com/press/${new Date(
      article.date
    ).getUTCFullYear()}/${slugify(article.publisher, {
      lower: true,
    })}`,
    source: `https://github.com/AnandChowdhary/everything/blob/main/data/press.json`,
    title: article.title,
    data: {
      publisher: article.publisher,
      href: article.href,
      author: article.author,
      description: article.description,
    },
  }));
};

