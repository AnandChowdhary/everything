const CACHE_ENABLED = Deno.env.get("CACHE_ENABLED") === "true";
console.log("Cache enabled", CACHE_ENABLED);

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

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
  name: string;
  date: string;
  emoji: string;
  venue: string;
  city: string;
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

interface IProject {
  slug: string;
  title: string;
  date: string;
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

interface ITravel {
  date: string;
  title: string;
  assets: string[];
}
const getTravel = async (): Promise<ITravel[]> => {
  if (CACHE_ENABLED) {
    const data = await Deno.readTextFile("./.cache/travel.json");
    return JSON.parse(data);
  }

  const travel = (await (
    await fetch("https://anandchowdhary.github.io/travel/api.json")
  ).json()) as ITravel[];
  return travel;
};

interface IBlogPost {
  slug: string;
  title: string;
  words: number;
  date: string;
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
  open_issues: number;
  forks_count: number;
  watchers_count: number;
  language: string;
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

export const generate = async () => {
  const { awards, podcasts, features } = await getPress();
  const { years } = await getOkrs();
  const okrs: {
    type: "okr";
    url: string;
    source: string;
    title: string;
    date: string;
    description: string;
    data: IOkrs["years"][0]["quarters"][0];
  }[] = [];
  years.forEach(({ name, quarters }) => {
    quarters.forEach((quarter) => {
      const date = new Date();
      date.setUTCFullYear(name);
      date.setUTCDate(1);
      date.setUTCMonth((quarter.name - 1) * 3);
      okrs.push({
        type: "okr",
        url: `https://anandchowdhary.com/life/okrs/${name}/${quarter.name}`,
        source: `https://anandchowdhary.github.io/okrs/okrs/${name}/${quarter.name}.json`,
        title: `Published OKRs for Q${quarter.name} ${name}`,
        date: date.toISOString().substring(0, 10),
        description: quarter.objectives.map(({ name }) => name).join(", "),
        data: quarter,
      });
    });
  });

  const timeline: {
    date: string;
    type: string;
    url: string;
    source: string;
    title: string;
    description?: string;
    data?: unknown;
  }[] = [
    ...okrs,
    ...(await getEvents()).map((event) => ({
      date: event.date,
      type: "event",
      url: `https://anandchowdhary.com/events/${new Date(
        event.date
      ).getUTCFullYear()}/${event.slug.replace(".md", "")}`,
      source: `https://anandchowdhary.github.io/events/events/${new Date(
        event.date
      ).getUTCFullYear()}/${event.slug.replace(".md", "")}`,
      title: event.name,
      data: {
        location: [event.venue, event.city].filter((i) => !!i).join(", "),
        emoji: event.emoji,
      },
    })),
    ...(await getProjects()).map((project) => ({
      date: project.date,
      type: "project",
      url: `https://anandchowdhary.com/projects/${new Date(
        project.date
      ).getUTCFullYear()}/${project.slug.replace(".md", "")}`,
      source: `https://anandchowdhary.github.io/projects/projects/${new Date(
        project.date
      ).getUTCFullYear()}/${project.slug.replace(".md", "")}`,
      title: project.title,
    })),
    ...(await getVersions()).map((version) => ({
      date: version.date,
      type: "version",
      url: `https://anandchowdhary.com/versions/${new Date(
        version.date
      ).getUTCFullYear()}/${version.slug.replace(".md", "")}`,
      source: `https://anandchowdhary.github.io/versions/versions/${new Date(
        version.date
      ).getUTCFullYear()}/${version.slug.replace(".md", "")}`,
      title: version.title,
    })),
    ...(await getBlogPosts()).map((post) => ({
      date: post.date,
      type: "blog-post",
      url: `https://anandchowdhary.com/blog/${new Date(
        post.date
      ).getUTCFullYear()}/${post.slug.replace(".md", "")}`,
      source: `https://anandchowdhary.github.io/blog/blog/${new Date(
        post.date
      ).getUTCFullYear()}/${post.slug.replace(".md", "")}`,
      title: post.title,
      data: { words: post.words },
    })),
    ...(await getBooks())
      .filter(({ state }) => state == "completed")
      .map((book) => ({
        date: book.startedAt,
        type: "book",
        url: `https://anandchowdhary.com/life/books/${new Date(
          book.startedAt
        ).getUTCFullYear()}/${slugify(book.title)}`,
        source: `https://github.com/AnandChowdhary/books/issues/${book.issueNumber}`,
        title: book.title,
        data: { image: book.image, authors: book.authors },
      })),
    ...(await getLifeEvents()).map((event) => ({
      date: event.date,
      type: "life-event",
      url: `https://anandchowdhary.com/life/milestones/${new Date(
        event.date
      ).getUTCFullYear()}/${slugify(event.title)}`,
      source: `https://github.com/AnandChowdhary/everything/blog/main/data/life-events.json`,
      title: event.title,
      description: event.description,
    })),
    ...(await getVideos()).map((video) => ({
      date: video.date,
      type: "video",
      url: `https://anandchowdhary.com/press/${new Date(
        video.date
      ).getUTCFullYear()}/${slugify(video.title)}`,
      source: `https://github.com/AnandChowdhary/everything/blog/main/data/videos.json`,
      title: video.title,
      data: {
        city: video.city,
        country: video.country,
        img: video.img,
        publisher: video.publisher,
        duration: video.duration,
      },
    })),
    ...(await getTravel()).map((place) => ({
      date: place.date,
      type: "travel",
      url: `https://anandchowdhary.com/travel/${new Date(
        place.date
      ).getUTCFullYear()}/${slugify(place.title)}`,
      source: `https://anandchowdhary.github.io/travel/travel/${new Date(
        place.date
      ).getUTCFullYear()}/${place.title.replace(".md", "")}`,
      title: place.title,
      data: { assets: place.assets },
    })),
    ...awards.map((award) => ({
      date: award.date,
      type: "award",
      url: `https://anandchowdhary.com/press/${new Date(
        award.date
      ).getUTCFullYear()}/${slugify(award.title)}`,
      source: `https://github.com/AnandChowdhary/everything/blog/main/data/press.json`,
      title: award.title,
      data: { publisher: award.publisher },
    })),
    ...podcasts.map((interview) => ({
      date: interview.date,
      type: "podcast-interview",
      url: `https://anandchowdhary.com/press/${new Date(
        interview.date
      ).getUTCFullYear()}/${slugify(interview.title)}`,
      source: `https://github.com/AnandChowdhary/everything/blog/main/data/press.json`,
      title: interview.title,
      data: { embed: interview.embed, publisher: interview.publisher },
    })),
    ...features.map((article) => ({
      date: article.date,
      type: "press-feature",
      url: `https://anandchowdhary.com/press/${new Date(
        article.date
      ).getUTCFullYear()}/${slugify(article.title)}`,
      source: `https://github.com/AnandChowdhary/everything/blog/main/data/press.json`,
      title: article.title,
      // href: article.href,
      data: {
        publisher: article.publisher,
        author: article.author,
        description: article.description,
      },
    })),
    ...(await getRepos()).map((repo) => ({
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
        language: repo.language,
        languageColor: repo.language_color,
      },
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  Deno.writeTextFile("api.json", JSON.stringify(timeline, null, 2) + "\n");
};

await generate();
