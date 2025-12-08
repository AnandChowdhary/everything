import type { IOkrs, TimelineOkr } from "../types/index.d.ts";

export const transformOkrs = (okrs: IOkrs): TimelineOkr[] => {
  const timelineOkrs: TimelineOkr[] = [];
  okrs.years.forEach(({ name, quarters }) => {
    quarters.forEach((quarter) => {
      const date = new Date();
      date.setUTCFullYear(name);
      date.setUTCDate(1);
      date.setUTCMonth((quarter.name - 1) * 3);
      timelineOkrs.push({
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
  return timelineOkrs;
};
