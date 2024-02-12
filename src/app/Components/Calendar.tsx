"use client";

import Link from "next/link";
import { useRecoilState } from "recoil";
import { calendarState } from "../atoms/calendar-atom";
import {
  BiSolidChevronLeftSquare,
  BiSolidChevronRightSquare,
} from "react-icons/bi";
import dayjs from "dayjs";
const Calendar = () => {
  const test = dayjs("2024/02");
  console.log(test.daysInMonth(), test.day(), test.get("month"));
  const [date, setDate] = useRecoilState(calendarState);
  const todayCheck = (day: number) => {
    const todayYear = new Date().getFullYear();
    const todayMonth = new Date().getMonth() + 1;
    const todayDate = new Date().getDate();

    return (
      todayYear === date.year && todayMonth === date.month && todayDate === day
    );
  };
  const changeMonth = (num: number) => {
    if (date.month + num > 12) {
      setDate({ year: date.year + 1, month: 1 });
    } else if (date.month + num < 1) {
      setDate({ year: date.year - 1, month: 12 });
    } else {
      setDate({ ...date, month: date.month + num });
    }
  };
  const month = date.month < 10 ? "0" + date.month : date.month;

  return (
    <div className="w-full p-5 bg-white shadow-2xl rounded-xl">
      <div className="w-full flex flex-col">
        <div
          className="flex items-center justify-between text-xl mb-10 
        "
        >
          <h2 className="font-semibold">{`${date.year}년 ${month}월`}</h2>
          <div className="flex">
            <BiSolidChevronLeftSquare
              size={40}
              color="gray"
              onClick={() => {
                changeMonth(-1);
              }}
            />
            <BiSolidChevronRightSquare
              size={40}
              color="gray"
              onClick={() => {
                changeMonth(1);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center gap-3 px-5 grow">
          <div className="w-full grid grid-cols-7">
            <div className="col-span-7 grid grid-cols-7 font-bold mb-8">
              <span className="text-red-600">일</span>
              <span>월</span>
              <span>화</span>
              <span>수</span>
              <span>목</span>
              <span>금</span>
              <span className="text-blue-600">토</span>
            </div>
            {salesCalendar(date.year, date.month).map((el, i) => (
              <div
                key={i}
                className={`border-b-2 border-b-gray-100 py-3 ${
                  i < 7 && +el > 20 ? "opacity-40 " : null
                } ${i > 20 && +el < 10 ? "opacity-40 " : null}`}
              >
                <p
                  className={`mb-3 text-lg ${
                    i % 7 == 0 ? "text-red-600" : null
                  } ${i % 7 === 6 ? "text-blue-600" : null}`}
                >
                  {el}
                </p>
                <span className="text-sm text-green-300">000000</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const salesCalendar = (year: number, month: number) => {
  const date = dayjs(`${year}/${month}`);
  const monthLength = date.daysInMonth();
  const monthFirst = date.day();
  const prevMonth =
    month === 1
      ? dayjs(`${year - 1}/12`).daysInMonth()
      : dayjs(`${year}/${month - 1}`).daysInMonth();
  const arr = [];
  for (let i = prevMonth - monthFirst + 1; i <= prevMonth; i++) {
    arr.push(i);
  }
  for (let i = 1; i <= monthLength; i++) {
    arr.push(i);
  }
  let nextMonth = 7 - (arr.length % 7);

  if (nextMonth < 7) {
    for (let i = 1; i <= nextMonth; i++) {
      arr.push(i);
    }
  }
  return arr;
};

const changeCalendar = (year: number, month: number): (string | number)[] => {
  let month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month == 2 && checkLeapYear(year)) month_day[1] = 29;
  let calendar_arr = [];
  let first_day = new Date(`${year}-${month}`).getDay();
  let lastMonthDay = month === 1 ? month_day[11] : month_day[month - 2];
  let lastMonthLength = lastMonthDay - first_day + 1;
  for (let i = lastMonthLength; i <= lastMonthDay; i++) {
    calendar_arr.push(i);
  }
  for (let i = 1; i <= month_day[month - 1]; i++) {
    calendar_arr.push(i);
  }
  let nextMonthDay = 7 - (calendar_arr.length % 7);

  if (nextMonthDay < 7) {
    for (let i = 1; i <= nextMonthDay; i++) {
      calendar_arr.push(i);
    }
  }
  return calendar_arr;
};

const checkLeapYear = (year: number): boolean => {
  if (year % 400) return true;
  else if (year % 100) return false;
  else if (year % 4) return true;
  else return false;
};
export default Calendar;
