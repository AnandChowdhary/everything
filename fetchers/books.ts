import type { IBook } from "../types/index.d.ts";

export const getBooks = async (): Promise<IBook[]> => {
  const books = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/books/main/api.json"
    )
  ).json()) as IBook[];
  return books;
};
