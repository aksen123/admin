"use client";

import { Calendars, Range, Sales } from "@/types/service";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  BiSolidChevronLeftSquare,
  BiSolidChevronRightSquare,
} from "react-icons/bi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DateState, MonthTotal, calendarState } from "../atoms/calendar-atom";
import { saleService } from "../service/sales";

const Calendar = () => {
  const [date, setDate] = useRecoilState(calendarState);
  const setDateState = useSetRecoilState(DateState);
  const setMonthTotal = useSetRecoilState(MonthTotal);
  const [calendarArr, setCalendarArr] = useState<Calendars[]>([]);
  const [pickDate, setPickDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const todayCheck = (date: string): Boolean => {
    return pickDate === date;
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
  const clickDate = (idx: number, date: number, format: string) => {
    if (idx < 7 && date > 20) {
      changeMonth(-1);
    } else if (idx > 20 && date < 10) {
      changeMonth(1);
    }
    setPickDate(format);
    getDetail(format);
  };

  const getDetail = async (format: string) => {
    const now = dayjs(format);
    const range: Range = {
      start: now.valueOf(),
      end: now.endOf("date").valueOf(),
    };

    const detail = await saleService.getSalesDetail(range);
    console.log(detail);
  };

  useEffect(() => {
    const current = dayjs(`${date.year}.${date.month}.01`);
    const monthFirst = current.day();
    const currentLength = current.daysInMonth();
    const blank = 7 - ((currentLength + monthFirst) % 7);
    const range: Range = {
      start: current.subtract(monthFirst, "day").valueOf(),
      end: current
        .endOf("month")
        .add(blank == 7 ? 0 : blank, "day")
        .valueOf(),
    };

    const getSales = async () => {
      const data = await saleService.getSales(range);
      console.log(data);
      setCalendarArr(data.calendars);
      setMonthTotal((month) => {
        return {
          ...month,
          total: data.totalPrice,
          salesCount: data.totalSalesCount,
        };
      });
    };
    getSales();
    getDetail(pickDate);
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
                  setPickDate(
                    dayjs(`${date.year}.${date.month}.01`)
                      .subtract(1, "month")
                      .startOf("month")
                      .format("YYYY-MM-DD")
                  );
                }}
              />
              <BiSolidChevronRightSquare
                size={40}
                color="gray"
                onClick={() => {
                  changeMonth(1);
                  setPickDate(
                    dayjs(`${date.year}.${date.month}.01`)
                      .add(1, "month")
                      .startOf("month")
                      .format("YYYY-MM-DD")
                  );
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
                      (i < 7 && el.date > 20) || (i > 20 && el.date < 10)
                        ? "opacity-40 cursor-text"
                        : "cursor-pointer"
                    } `}
                    onClick={() => {
                      clickDate(i, el.date, el.format);
                    }}
                  >
                    <p
                      className={`mb-3 text-lg ${
                        i % 7 == 0 ? "text-red-600" : null
                      } ${i % 7 === 6 ? "text-blue-600" : null} ${
                        todayCheck(el.format) ? "bg-blue-600 text-white" : null
                      }`}
                    >
                      {el.date}
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
