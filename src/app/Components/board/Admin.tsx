"user client";

import { getOrder } from "@/app/service/order";
import { ViewBoard } from "@/types/enum";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Card from "./Card";
import dayjs from "dayjs";

export default function Admin({ store }: { store: string }) {
  const [view, setView] = useState<string>(ViewBoard.wait);
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const today = dayjs().format("YYYY-MM-DD") === date;
  const { data, isLoading } = useSWR(
    store ? `/api/order/date/${date}` : null,
    () => getOrder.getStore(store, date)
  );
  const onClick = (text: string) => {
    setView(text);
  };
  const handleDate = (num: number) => {
    const newDate = dayjs(date).add(num, "day").format("YYYY-MM-DD");
    setDate(newDate);
  };
  useEffect(() => {
    setView(ViewBoard.wait);
  }, [date]);

  if (isLoading) {
    return <div>불러오는중!</div>;
  }
  return (
    data && (
      <div className="h-full">
        <div className="flex justify-between">
          <button className="text-3xl" onClick={() => handleDate(-1)}>
            ◀
          </button>
          <h2 className="w-full text-center text-3xl text-blue-600 font-bold mb-5">
            {dayjs(date).format("YYYY년 MM월 DD일")} 매출현황
          </h2>
          <button
            className={`text-3xl ${today && "cursor-text text-gray-400"}`}
            onClick={() => (today ? null : handleDate(1))}
          >
            ▶
          </button>
        </div>
        <div className="w-full mb-10 flex justify-center gap-10">
          <span>건수 : {data.complete.length}건</span>
          <span>매출 : {data.total.toLocaleString()}원</span>
        </div>
        <div className="flex justify-around bg-white rounded-t-2xl">
          <button
            onClick={() => {
              onClick(ViewBoard.wait);
            }}
            className={`flex-1 text-center font-semibold p-3 ${
              view === ViewBoard.wait
                ? "border-b-2 border-blue-600 text-blue-600"
                : null
            }`}
          >
            대기 {data.wait.length}
          </button>
          <button
            onClick={() => {
              onClick(ViewBoard.receipt);
            }}
            className={`flex-1 text-center font-semibold p-3 ${
              view === ViewBoard.receipt
                ? "border-b-2 border-blue-600 text-blue-600"
                : null
            }`}
          >
            접수 {data.receipt.length}
          </button>
          <button
            onClick={() => {
              onClick(ViewBoard.complete);
            }}
            className={`flex-1 text-center font-semibold p-3 ${
              view === ViewBoard.complete
                ? "border-b-2 border-blue-600 text-blue-600"
                : null
            }`}
          >
            완료 {data.count}
          </button>
        </div>
        {view === ViewBoard.wait ? (
          <Card sales={data?.wait} view={view} date={date} />
        ) : null}
        {view === ViewBoard.receipt ? (
          <Card sales={data?.receipt} view={view} date={date} />
        ) : null}
        {view === ViewBoard.complete ? (
          <Card sales={data?.complete} view={view} date={date} />
        ) : null}
      </div>
    )
  );
}
