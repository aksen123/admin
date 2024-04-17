"use client";

import { MdCalendarMonth } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { calendarState, MonthTotal } from "../atoms/calendar-atom";
import Calendar from "./Calendar";

interface Props {
  storeCode: string | null;
}

export default function SalesPage({ storeCode }: Props) {
  const date = useRecoilValue(calendarState);
  const amount = useRecoilValue(MonthTotal);

  return (
    <div className="w-full flex flex-col gap-10">
      <h2 className="text-2xl font-bold">
        {date.year}년 {date.month}월 매출현황
      </h2>
      <div className="py-5 pl-4 bg-white shadow-xl rounded-xl grid grid-cols-3">
        <div className="flex items-center justify-between px-4">
          <div>
            <span className="text-gray-400 text-sm">총 매출 금액</span>
            <p className="font-semibold text-xl">
              {amount.total.toLocaleString()}원
            </p>
          </div>
          <MdCalendarMonth size={30} color="blue" />
        </div>
        <div className="flex items-center justify-between px-4 relative before:absolute before:w-[1px] before:h-full before:bg-black before:left-0">
          <div>
            <span className="text-gray-400 text-sm">이전 달 매출</span>
            <p className="font-semibold text-xl">
              {amount.prevTotal.toLocaleString()}원
            </p>
          </div>
          <RiMoneyDollarCircleFill size={30} color="blue" />
        </div>
        <div className="flex items-center justify-between px-4 relative before:absolute before:w-[1px] before:h-full before:bg-black before:left-0">
          <div>
            <span className="text-gray-400 text-sm">매출 변화율</span>
            <p
              className={`font-semibold text-xl ${
                (amount.percentage as number) < 0
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {amount.percentage} %
            </p>
          </div>
          <RiMoneyDollarCircleFill size={30} color="blue" />
        </div>
      </div>
      <Calendar storeCode={storeCode} />
    </div>
  );
}
