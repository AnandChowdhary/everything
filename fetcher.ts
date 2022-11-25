const CACHE_ENABLED = Deno.env.get("CACHE_ENABLED") === "true";
console.log("Cache enabled", CACHE_ENABLED);

import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import type {
  Timeline,
  TimelineAward,
  TimelineBlogPost,
  TimelineBook,
  TimelineEvent,
  TimelineLifeEvent,
  TimelineOkr,
  TimelineOpenSourceProject,
  TimelinePodcastInterview,
  TimelinePressFeature,
  TimelineProject,
  TimelineTheme,
  TimelineTravel,
  TimelineVersion,
  TimelineVideo,
} from "./types/index.d.ts";

interface IOkrs {
  updatedAt: string;
  years: {
    name: number;
    progress: number;
    success: number;
    quarters: {
      name: number;
      progress: number;
      success: number;
      objectives: {
        name: string;
        progress: number;
        success: number;
        key_results: {
          name: string;
          target_result: number;
          current_result: number;
          progress: number;
          success: number;
        }[];
      }[];
    }[];
  }[];
}
const getOkrs = async (): Promise<IOkrs> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/okrs.json");
    return JSON.parse(data);
  }

  const okrs = (await (
    await fetch("https://anandchowdhary.github.io/okrs/api.json")
  ).json()) as IOkrs;
  return okrs;
};

interface IEvent {
  slug: string;
  path: string;
  source: string;
  title: string;
  date: string;
  excerpt: string;
  caption: string;
  attributes: {
    remote?: boolean;
    city?: string;
    country?: string;
    venue?: string;
    coordinates?: [number, number];
    video?: string;
    talk?: string;
    event?: string;
  };
}
const getEvents = async (): Promise<IEvent[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/events.json");
    return JSON.parse(data);
  }

  const events = (await (
    await fetch("https://anandchowdhary.github.io/events/api.json")
  ).json()) as IEvent[];
  return events;
};

interface ITheme {
  slug: string;
  title: string;
  words: number;
  date: string;
  excerpt: string;
}
const getThemes = async (): Promise<ITheme[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/themes.json");
    return JSON.parse(data);
  }

  const themes = (await (
    await fetch("https://anandchowdhary.github.io/themes/api.json")
  ).json()) as ITheme[];
  return themes;
};

interface IProject {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  attributes?: {
    title?: string;
    intro?: string;
    work?: string[];
    collaborators?: string[];
    bg?: string;
    style?: string;
    img_src?: string;
    img_type?: string;
    tools?: string[];
    icon?: string;
    icon_bg?: boolean;
  };
}
const getProjects = async (): Promise<IProject[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/projects.json");
    return JSON.parse(data);
  }

  const projects = (await (
    await fetch("https://anandchowdhary.github.io/projects/api.json")
  ).json()) as IProject[];
  return projects;
};

interface IVersion {
  slug: string;
  title: string;
  date: string;
}
const getVersions = async (): Promise<IVersion[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/versions.json");
    return JSON.parse(data);
  }

  const versions = (await (
    await fetch("https://anandchowdhary.github.io/versions/api.json")
  ).json()) as IVersion[];
  return versions;
};

interface IBlogPost {
  slug: string;
  title: string;
  words: number;
  date: string;
  excerpt: string;
}
const getBlogPosts = async (): Promise<IBlogPost[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/blog.json");
    return JSON.parse(data);
  }

  const blogPosts = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/blog/HEAD/api.json"
    )
  ).json()) as IBlogPost[];
  return blogPosts;
};

interface IBook {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  image: string;
  issueNumber: number;
  progressPercent: number;
  state: "reading" | "completed";
  startedAt: string;
}
const getBooks = async (): Promise<IBook[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/books.json");
    return JSON.parse(data);
  }

  const books = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/books/HEAD/api.json"
    )
  ).json()) as IBook[];
  return books;
};

interface ILifeEvent {
  date: string;
  title: string;
  description?: string;
}
const getLifeEvents = async (): Promise<ILifeEvent[]> => {
  const lifeEvents = JSON.parse(
    await Deno.readTextFile("./data/life-events.json")
  ) as ILifeEvent[];
  return lifeEvents;
};

interface IPress {
  awards: {
    title: string;
    publisher: string;
    date: string;
    href: string;
  }[];
  podcasts: {
    title: string;
    publisher: string;
    date: string;
    href: string;
    embed?: string;
  }[];
  features: {
    title: string;
    publisher: string;
    date: string;
    href: string;
    author?: string;
    description?: string;
  }[];
}
const getPress = async (): Promise<IPress> => {
  const press = JSON.parse(
    await Deno.readTextFile("./data/press.json")
  ) as IPress;
  return press;
};

interface IVideo {
  title: string;
  href: string;
  city: string;
  country: string;
  date: string;
  img: string;
  publisher: string;
  duration: string;
  description: string;
}
const getVideos = async () => {
  const videos = JSON.parse(
    await Deno.readTextFile("./data/videos.json")
  ) as IVideo[];
  return videos;
};

interface IRepo {
  html_url: string;
  full_name: string;
  created_at: string;
  description?: string;
  stargazers_count: number;
  topics?: string[];
  open_issues: number;
  forks_count: number;
  watchers_count: number;
  language?: string;
  language_color?: string;
}
const getRepos = async (): Promise<IRepo[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/repos.json");
    return JSON.parse(data);
  }

  const repos = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/featured/HEAD/repos.json"
    )
  ).json()) as IRepo[];
  return repos;
};

interface ILocation {
  hash: string;
  updatedAt: string;
  approximateCoordinates: [number, number];
  label: string;
  timezone: {
    name: string;
    utcOffset: number;
    dstOffset: number;
  };
  country: {
    code: string;
    name: string;
  };
}
const getLocation = async (): Promise<ILocation[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/location.json");
    return JSON.parse(data);
  }

  const locations = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/location/gh-pages/history-unique.json"
    )
  ).json()) as ILocation[];
  return locations;
};

export const generate = async () => {
  const {
    awards: awardsData,
    podcasts: podcastsData,
    features: featuresData,
  } = await getPress();

  const { years } = await getOkrs();
  const okrs: TimelineOkr[] = [];
  years.forEach(({ name, quarters }) => {
    quarters.forEach((quarter) => {
      const date = new Date();
      date.setUTCFullYear(name);
      date.setUTCDate(1);
      date.setUTCMonth((quarter.name - 1) * 3);
      okrs.push({
        type: "okr",
        url: `https://anandchowdhary.com/okrs/${name}/${quarter.name}`,
        source: `https://anandchowdhary.github.io/okrs/okrs/${name}/${quarter.name}.json`,
        title: `Published OKRs for Q${quarter.name} ${name}`,
        date: date.toISOString().substring(0, 10),
        data: {
          ...quarter,
          description: quarter.objectives.map(({ name }) => name).join(", "),
        },
      });
    });
  });

  const events: TimelineEvent[] = (await getEvents()).map((event) => ({
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
    },
  }));

  const projects: TimelineProject[] = (await getProjects()).map((project) => ({
    date: project.date,
    type: "project",
    url: `https://anandchowdhary.com/projects/${new Date(
      project.date
    ).getUTCFullYear()}/${project.slug.replace(".md", "")}`,
    source: `https://anandchowdhary.github.io/projects/projects/${new Date(
      project.date
    ).getUTCFullYear()}/${project.slug.replace(".md", "")}`,
    title: project.title,
    data: {
      description: project.attributes?.intro ?? project.excerpt,
      tags: [
        ...(project.attributes?.work ?? []),
        ...(project.attributes?.tools ?? []),
      ],
      collaborators: project.attributes?.collaborators ?? [],
      icon: project.attributes?.icon
        ? {
            url: `https://raw.githubusercontent.com/AnandChowdhary/projects/main${project.attributes.icon}`,
            requiresBackground: !!project.attributes?.icon_bg,
          }
        : undefined,
      image: project.attributes?.img_src
        ? {
            url: `https://raw.githubusercontent.com/AnandChowdhary/projects/main${
              project.attributes.img_src
            }${
              project.attributes?.img_type
                ? `.${project.attributes.img_type}`
                : ""
            }`,
            attachment:
              project.attributes?.style === "padded" ? "padded" : "cover",
            color: project.attributes?.bg,
          }
        : undefined,
    },
  }));

  const versions: TimelineVersion[] = (await getVersions()).map((version) => ({
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

  const blog: TimelineBlogPost[] = (await getBlogPosts()).map((post) => ({
    date: post.date,
    type: "blog-post",
    url: `https://anandchowdhary.com/blog/${new Date(
      post.date
    ).getUTCFullYear()}/${post.slug.replace(".md", "")}`,
    source: `https://anandchowdhary.github.io/blog/blog/${new Date(
      post.date
    ).getUTCFullYear()}/${post.slug.replace(".md", "")}`,
    title: post.title,
    data: { words: post.words, excerpt: post.excerpt },
  }));

  const themes: TimelineTheme[] = (await getThemes()).map((theme) => ({
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

  const books: TimelineBook[] = (await getBooks())
    .filter(({ state }) => state == "completed")
    .map((book) => ({
      date: book.startedAt,
      type: "book",
      url: `https://anandchowdhary.com/books/${new Date(
        book.startedAt
      ).getUTCFullYear()}/${slugify(book.title, {
        lower: true,
      })}`,
      source: `https://github.com/AnandChowdhary/books/issues/${book.issueNumber}`,
      title: book.title,
      data: { image: book.image, authors: book.authors },
    }));

  const locations: TimelineTravel[] = (await getLocation()).map((location) => ({
    date: location.updatedAt,
    type: "travel",
    url: `https://anandchowdhary.com/travel/${new Date(
      location.updatedAt
    ).getUTCFullYear()}/${slugify(location.label, {
      lower: true,
    })}-${location.country.code.toLowerCase()}`,
    source: `https://github.com/AnandChowdhary/location/commit/${location.hash}`,
    title: `${location.label}, ${location.country.name}`,
    data: {
      hash: location.hash,
      approximateCoordinates: location.approximateCoordinates,
      label: location.label,
      timezone: location.timezone,
      country: location.country,
    },
  }));

  const lifeEvents: TimelineLifeEvent[] = (await getLifeEvents()).map(
    (event) => ({
      date: event.date,
      type: "life-event",
      url: `https://anandchowdhary.com/milestones/${new Date(
        event.date
      ).getUTCFullYear()}/${slugify(event.title, {
        lower: true,
      })}`,
      source: `https://github.com/AnandChowdhary/everything/blob/main/data/life-events.json`,
      title: event.title,
      data: { description: event.description },
    })
  );

  const videos: TimelineVideo[] = (await getVideos()).map((video) => ({
    date: video.date,
    type: "video",
    url: `https://anandchowdhary.com/press/${new Date(
      video.date
    ).getUTCFullYear()}/${slugify(video.title, {
      lower: true,
    })}`,
    source: `https://github.com/AnandChowdhary/everything/blob/main/data/videos.json`,
    title: video.title,
    data: {
      href: video.href,
      city: video.city,
      country: video.country,
      img: video.img,
      publisher: video.publisher,
      duration: video.duration,
    },
  }));

  const awards: TimelineAward[] = awardsData.map((award) => ({
    date: award.date,
    type: "award",
    url: `https://anandchowdhary.com/press/${new Date(
      award.date
    ).getUTCFullYear()}/${slugify(award.title, {
      lower: true,
    })}`,
    source: `https://github.com/AnandChowdhary/everything/blob/main/data/press.json`,
    title: award.title,
    data: { href: award.href, publisher: award.publisher },
  }));

  const podcastInterviews: TimelinePodcastInterview[] = podcastsData.map(
    (interview) => ({
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
    })
  );

  const pressFeatures: TimelinePressFeature[] = featuresData.map((article) => ({
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

  const openSourceProjects: TimelineOpenSourceProject[] = (
    await getRepos()
  ).map((repo) => ({
    date: repo.created_at,
    type: "open-source-project",
    title: repo.full_name,
    url: `https://anandchowdhary.com/projects/${new Date(
      repo.created_at
    ).getUTCFullYear()}/${repo.full_name.split("/")[1]}`,
    source: repo.html_url,
    data: {
      description: repo.description,
      stars: repo.stargazers_count,
      issues: repo.open_issues,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      topics: repo.topics ?? [],
      language: repo.language,
      languageColor: repo.language_color,
    },
  }));

  const timeline: Timeline = [
    ...okrs,
    ...events,
    ...projects,
    ...versions,
    ...blog,
    ...themes,
    ...books,
    ...locations,
    ...lifeEvents,
    ...videos,
    ...awards,
    ...podcastInterviews,
    ...pressFeatures,
    ...openSourceProjects,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  Deno.writeTextFile("api.json", JSON.stringify(timeline, null, 2) + "\n");
};

await generate();
