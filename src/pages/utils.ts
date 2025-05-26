import dayjs from "dayjs";

export const hour = (keys: number) =>
  [...Array(keys * 2).keys()].map((i) => i * 0.5);

export function calcWeek(start?: string) {
  const date = start ? dayjs(start) : dayjs();
  const day = date.day();
  const startDay = date.subtract(day, "d");
  const week = [];
  for (let day = 0; day < 7; day++) {
    week.push(startDay.add(day, "day"));
  }

  return week;
}

export function calcDay(start?: string) {
  const date = start ? dayjs(start) : dayjs();
  const day = date.day();
  const startDay = date.subtract(day, "d");
  const week = [];
  for (let day = 0; day < 7; day++) {
    week.push(date.add(day, "day"));
  }

  return week;
}
