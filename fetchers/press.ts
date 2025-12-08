import { readFile } from "fs/promises";
import type { IPress } from "../types/index.d.ts";

export const getPress = async (): Promise<IPress> => {
  const press = JSON.parse(
    await readFile("./data/press.json", "utf-8")
  ) as IPress;
  return press;
};

