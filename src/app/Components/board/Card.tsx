import { getOrder } from "@/app/service/order";
import { ViewBoard } from "@/types/enum";
import { BoardStatus, Sales } from "@/types/service";
import dayjs from "dayjs";
import React from "react";
import { KeyedMutator, mutate } from "swr";

interface CardProps {
  sales: Sales[];
  view: string;
  mutate : KeyedMutator<BoardStatus>
  date : string
}

export default function Card({ sales, view,date }: CardProps) {
  const onClick = async (id: string) => {
    const data = { id, view };
    await getOrder.post(data);
    mutate(`/api/order/date/${date}`)
  };
  return (
    <div className="w-full grid grid-cols-4 justify-center items-start gap-x-8 gap-y-8 p-8 bg-white rounded-b-2xl min-h-screen h-fit">
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="min-h-48 h-fit flex flex-col rounded-2xl shadow-lg shadow-orange-200"
        >
          <div className="bg-orange-400 rounded-t-2xl p-2 px-4 font-semibold text-white flex justify-between">
            <span>{sale.id}</span>
            <span>{dayjs(sale.date).format("HH:mm")}</span>
          </div>
          <div className="flex-1 border-b-[1px] border-b-gray-400 border-x-2 border-x-orange-400 p-2 px-4">
            {sale.order.map((order, i) => (
              <div key={order.name + i} className="flex justify-between">
                <span>{order.name}</span>
                <span>{order.count}</span>
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              view !== ViewBoard.complete ? onClick(sale.id) : false;
            }}
            className="flex justify-between p-2 px-4 hover:bg-orange-400 hover:text-white active:text-white  active:bg-orange-500 rounded-b-2xl border-2 border-t-0 border-orange-400"
          >
            {view !== ViewBoard.complete ? (
              <span>{view === ViewBoard.wait ? "접수" : "완료"}</span>
            ) : (
              <span> </span>
            )}
            <p className="text-left">{sale.total.toLocaleString()}원</p>
          </div>
        </div>
      ))}
    </div>
  );
}
