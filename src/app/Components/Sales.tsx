"use client";

import { MdCalendarMonth } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { calendarState, MonthTotal } from "../atoms/calendar-atom";
import Calendar from "./Calendar";

interface Props {
  storeName: string | null;
}

export default function SalesPage({ storeName }: Props) {
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
            <span className="text-gray-400 text-xs">이전 달 매출</span>
            <p className="font-semibold text-sm">
              {amount.prevTotal.toLocaleString()}원
            </p>
          </div>
          <MdCalendarMonth size={30} color="blue" />
        </div>
        <div className="flex items-center justify-between px-4 relative before:absolute before:w-[1px] before:h-full before:bg-black before:left-0">
          <div>
            <span className="text-gray-400 text-sm">총 매출 건수</span>
            <p className="font-semibold text-xl">{amount.salesCount}건</p>
          </div>
          <RiMoneyDollarCircleFill size={30} color="blue" />
        </div>
        <div className="flex items-center justify-between px-4 relative before:absolute before:w-[1px] before:h-full before:bg-black before:left-0">
          <div>
            <span className="text-gray-400 text-sm">총 주문 건수</span>
            <p className="font-semibold text-xl">{amount.orderCount}건</p>
          </div>
          <RiMoneyDollarCircleFill size={30} color="blue" />
        </div>
      </div>
      <Calendar storeName={storeName} />
    </div>
  );
}
