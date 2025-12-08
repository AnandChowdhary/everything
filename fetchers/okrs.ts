import type { IOkrs } from "../types/index.d.ts";

export const getOkrs = async (): Promise<IOkrs> => {
  const okrs = (await (
    await fetch(
      "https://raw.githubusercontent.com/AnandChowdhary/okrs/main/api.json"
    )
  ).json()) as IOkrs;
  return okrs;
};

