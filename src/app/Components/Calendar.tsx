"use client";

import { Sales } from "@/types/service";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  BiSolidChevronLeftSquare,
  BiSolidChevronRightSquare,
} from "react-icons/bi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DateState, MonthTotal, calendarState } from "../atoms/calendar-atom";
import { saleService } from "../service/sales";

interface CalendarType {
  day: number;
  data: Sales[];
  total?: number;
}
const Calendar = () => {
  const [date, setDate] = useRecoilState(calendarState);
  const setDateState = useSetRecoilState(DateState);
  const setMonthTotal = useSetRecoilState(MonthTotal);
  const [calendarArr, setCalendarArr] = useState<CalendarType[]>([]);
  const [pickDate, setPickDate] = useState<number>(1);
  const todayCheck = (day: number): Boolean => {
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1;
    const currentDate = dayjs().date();
    console.log(currentDate, currentMonth, currentYear);
    return (
      currentYear === date.year &&
      currentMonth === date.month &&
      currentDate === day
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
  const clickDate = (num1: number, num2: number, data: CalendarType) => {
    if (num1 < 7 && num2 > 20) {
      changeMonth(-1);
      setPickDate(num2);
    } else if (num1 > 20 && num2 < 10) {
      changeMonth(1);
      setPickDate(num2);
    } else {
      setDateState({
        date: data.day,
        dateTotal: data.total || 0,
        count: data.data.length,
      });
    }
  };
  const month = date.month < 10 ? "0" + date.month : date.month;

  useEffect(() => {
    const current = dayjs(`${date.year}.${date.month}.01`);
    const monthFirst = current.day();
    const currentLength = current.daysInMonth();
    const blank = 7 - ((currentLength + monthFirst) % 7);
    const range = {
      start: current.subtract(monthFirst, "day").valueOf(),
      end: current
        .endOf("month")
        .add(blank == 7 ? 0 : blank, "day")
        .valueOf(),
    };

    const getSales = async () => {
      const data = await saleService.get(range);
      const arr: CalendarType[] = [];

      for (let i = monthFirst; i > 0; i--) {
        const sales = data.filter((el) => {
          if (
            dayjs(el.date).format("YYYY-MM-DD") ===
            current.startOf("month").subtract(i, "day").format("YYYY-MM-DD")
          )
            return el;
        });
        let totalPrice = sales.reduce((acc, curr) => acc + curr.totalPrice, 0);
        arr.push({
          day: current.startOf("month").subtract(i, "day").date(),
          data: sales,
          // total: totalPrice,
        });
      }

      let monthTotal = 0;
      for (let i = 1; i <= currentLength; i++) {
        const sales = data.filter((el) => {
          if (
            dayjs(el.date).format("YYYY-MM-DD") ===
            current.add(i - 1, "day").format("YYYY-MM-DD")
          ) {
            return el;
          }
        });
        let totalPrice = sales.reduce((acc, curr) => acc + curr.totalPrice, 0);
        monthTotal += totalPrice;
        arr.push({
          day: i,
          data: sales,
          total: totalPrice,
        });
        i == currentLength ? setMonthTotal(monthTotal) : false;
        todayCheck(i)
          ? setDateState({
              date: i,
              dateTotal: totalPrice,
              count: sales.length,
            })
          : i === pickDate
          ? setDateState({
              date: i,
              dateTotal: totalPrice,
              count: sales.length,
            })
          : false;
      }

      if (blank < 7) {
        for (let i = 1; i <= blank; i++) {
          const sales = data.filter((el) => {
            if (
              dayjs(el.date).format("YYYY-MM-DD") ===
              current.endOf("month").add(i, "day").format("YYYY-MM-DD")
            ) {
              return el;
            }
          });
          let totalPrice = sales.reduce(
            (acc, curr) => acc + curr.totalPrice,
            0
          );

          arr.push({
            day: i,
            data: sales,
            // total: totalPrice,
          });
        }
      }
      setCalendarArr(arr);
    };
    getSales();
  }, [date]);

  return (
    <div className="flex space-x-4">
      <div className="w-full p-5 bg-white shadow-2xl rounded-xl">
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-end text-xl mb-10">
            <div className="flex">
              <BiSolidChevronLeftSquare
                size={40}
                color="gray"
                onClick={() => {
                  changeMonth(-1);
                  setPickDate(1);
                }}
              />
              <BiSolidChevronRightSquare
                size={40}
                color="gray"
                onClick={() => {
                  changeMonth(1);
                  setPickDate(1);
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
              {calendarArr.map((el, i) => {
                return (
                  <div
                    key={i}
                    className={`border-b-2 border-b-gray-100 py-3  ${
                      (i < 7 && +el.day > 20) || (i > 20 && +el.day < 10)
                        ? "opacity-40 cursor-text"
                        : "cursor-pointer"
                    } `}
                    onClick={() => {
                      clickDate(i, +el.day, el);
                    }}
                  >
                    <p
                      className={`mb-3 text-lg ${
                        i % 7 == 0 ? "text-red-600" : null
                      } ${i % 7 === 6 ? "text-blue-600" : null}`}
                    >
                      {el.day}
                    </p>

                    <span
                      className={`
                      text-sm
                      ${
                        typeof el.total === "number" && el.total === 0
                          ? "text-gray-300"
                          : "text-blue-500"
                      }
                    `}
                    >
                      {typeof el.total === "number"
                        ? `${el.total?.toLocaleString()}원`
                        : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/4 p-5 bg-white shadow-2xl rounded-xl">tests</div>
    </div>
  );
};

export default Calendar;
