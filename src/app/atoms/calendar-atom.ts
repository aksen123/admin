import dayjs from "dayjs";
import { atom } from "recoil";

interface YearMonth {
  year: number;
  month: number;
}
const date = dayjs();

export const calendarState = atom<YearMonth>({
  key: "calendarState",
  default: { year: date.year(), month: date.month() + 1 },
});

export const DateState = atom({
  key: "sales amount",
  default: { date: 0, dateTotal: 0, count: 0 },
});
export const MonthTotal = atom({
  key: "month total",
  default: 0,
});
