import { atom } from "recoil";

interface YearMonth {
  year: number;
  month: number;
}

export const calendarState = atom<YearMonth>({
  key: "calendarState",
  default: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
});
