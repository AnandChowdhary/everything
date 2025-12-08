import { readFile } from "fs/promises";
import type { ILifeEvent } from "../types/index.d.ts";

export const getLifeEvents = async (): Promise<ILifeEvent[]> => {
  const lifeEvents = JSON.parse(
    await readFile("./data/life-events.json", "utf-8")
  ) as ILifeEvent[];
  return lifeEvents;
};

