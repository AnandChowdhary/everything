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
