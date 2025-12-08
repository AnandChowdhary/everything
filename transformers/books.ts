import slugify from "@sindresorhus/slugify";
import type { IBook, TimelineBook } from "../types/index.d.ts";

export const transformBooks = (books: IBook[]): TimelineBook[] => {
  return books
    .filter(({ state }) => state == "completed")
    .map((book) => ({
      date: book.startedAt,
      type: "book",
      url: `https://anandchowdhary.com/books/${new Date(
        book.startedAt
      ).getUTCFullYear()}/${slugify(book.title)}`,
      source: `https://github.com/AnandChowdhary/books/issues/${book.issueNumber}`,
      title: book.title,
      data: { image: book.image, authors: book.authors },
    }));
};

