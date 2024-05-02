"user client";

import { getOrder } from "@/app/service/order";
import { ViewBoard } from "@/types/enum";
import React, { useState } from "react";
import useSWR from "swr";
import Card from "./Card";
import dayjs from "dayjs";

export default function Admin({ store }: { store: string }) {
  const { data } = useSWR(store ? `/api/order` : null, () =>
    getOrder.getStore(store)
  );
  const [view, setView] = useState<string>("wait");

  const onClick = (text: string) => {
    setView(text);
  };
  return (
    data && (
      <div className="h-full">
        <h2 className="w-full text-center text-3xl text-blue-600 font-bold mb-5">
          {dayjs().format("YYYY년 MM월 DD일")} 매출현황
        </h2>
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
          <Card sales={data?.wait} view={view} />
        ) : null}
        {view === ViewBoard.receipt ? (
          <Card sales={data?.receipt} view={view} />
        ) : null}
        {view === ViewBoard.complete ? (
          <Card sales={data?.complete} view={view} />
        ) : null}
      </div>
    )
  );
}
