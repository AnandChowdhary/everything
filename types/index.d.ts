export interface TimelineBaseItem<
  Type extends string,
  Data extends Record<string, unknown> | undefined
> {
  type: Type;
  url: string;
  source: string;
  title: string;
  date: string;
  data: Data;
}

export type TimelineOkr = TimelineBaseItem<
  "okr",
  {
    name: number;
    description: string;
    progress: number;
    success: number;
    objectives: {
      name: string;
      progress: number;
      success: number;
      key_results: {
        name: string;
        current_result: number;
        target_result: number;
        progress: number;
        success: number;
      }[];
    }[];
  }
>;

export type TimelineEvent = TimelineBaseItem<
  "event",
  {
    remote: boolean;
    country?: string;
    city?: string;
    venue?: string;
    coordinates?: [number, number];
    video?: string;
    talk?: string;
    event?: string;
    slides?: string;
    embed?: string;
  }
>;

export type TimelineProject = TimelineBaseItem<
  "project",
  {
    description: string;
    tags: string[];
    collaborators: string[];
    icon?: {
      url: string;
      requiresBackground: boolean;
    };
    image?: {
      url: string;
      attachment: "padded" | "cover";
      color?: string;
    };
  }
>;

export type TimelineVersion = TimelineBaseItem<"version", undefined>;

export type TimelineBlogPost = TimelineBaseItem<
  "blog-post",
  { words: number; excerpt: string }
>;

export type TimelineTheme = TimelineBaseItem<
  "theme",
  { year: number; description: string }
>;

export type TimelineBook = TimelineBaseItem<
  "book",
  { image: string; authors: string[] }
>;

export type TimelineTravel = TimelineBaseItem<
  "travel",
  {
    hash: string;
    approximateCoordinates: [number, number];
    label: string;
    countryCode: string;
  }
>;

export type TimelineLifeEvent = TimelineBaseItem<
  "life-event",
  { description?: string }
>;

export type TimelineVideo = TimelineBaseItem<
  "video",
  {
    city: string;
    country: string;
    img: string;
    publisher: string;
    href: string;
    duration: string;
  }
>;

export type TimelineAward = TimelineBaseItem<
  "award",
  { publisher: string; href: string }
>;

export type TimelinePodcastInterview = TimelineBaseItem<
  "podcast-interview",
  { publisher: string; href: string; embed?: string }
>;

export type TimelinePressFeature = TimelineBaseItem<
  "press-feature",
  { publisher: string; href: string; author?: string; description?: string }
>;

export type TimelineOpenSourceProject = TimelineBaseItem<
  "open-source-project",
  {
    description?: string;
    stars: number;
    issues: number;
    forks: number;
    watchers: number;
    topics: string[];
    language?: string;
    languageColor?: string;
    openGraphImageUrl?: string;
  }
>;

export type TimeLineItem =
  | TimelineOkr
  | TimelineEvent
  | TimelineProject
  | TimelineVersion
  | TimelineBlogPost
  | TimelineTheme
  | TimelineBook
  | TimelineTravel
  | TimelineLifeEvent
  | TimelineVideo
  | TimelineAward
  | TimelinePodcastInterview
  | TimelinePressFeature
  | TimelineOpenSourceProject;

export type Timeline = TimeLineItem[];

export interface IOkrs {
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

export interface IEvent {
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
    slides?: string;
    embed?: string;
  };
}

export interface ITheme {
  slug: string;
  title: string;
  words: number;
  date: string;
  excerpt: string;
}

export interface IProject {
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
    stack?: string[];
    icon?: string;
    icon_bg?: boolean;
  };
}

export interface IVersion {
  slug: string;
  title: string;
  date: string;
}

export interface IBlogPost {
  slug: string;
  title: string;
  words: number;
  date: string;
  excerpt: string;
  attributes?: { draft?: true };
}

export interface IBook {
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

export interface ILifeEvent {
  date: string;
  title: string;
  description?: string;
}

export interface IPress {
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

export interface IVideo {
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

export interface IRepo {
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
  open_graph_image_url?: string;
}

export interface ILocation {
  hash: string;
  date: string;
  coordinates: [number, number];
  label: string;
  country_code: string;
}
