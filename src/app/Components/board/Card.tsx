import { getOrder } from "@/app/service/order";
import { ViewBoard } from "@/types/enum";
import { Sales } from "@/types/service";
import dayjs from "dayjs";
import React from "react";
import { mutate } from "swr";
interface CardProps {
  sales: Sales[];
  view: string;
}

export default function Card({ sales, view }: CardProps) {
  const onClick = async (id: string) => {
    const data = { id, view };
    await getOrder.post(data);
    mutate("/api/order");
  };
  return (
    <div className="w-full grid grid-cols-4 justify-center items-start gap-8 p-8">
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="bg-white min-h-48 h-fit flex flex-col rounded-2xl"
        >
          <div className="bg-orange-400 rounded-t-2xl p-2 font-semibold text-white flex justify-between">
            <span>{sale.id}</span>
            <span>{dayjs(sale.date).format("HH:mm")}</span>
          </div>
          <div className="flex-1 border-b-[1px] border-gray-400 p-2">
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
            className="flex justify-between p-2 hover:bg-slate-400 hover:text-white active:text-white  active:bg-slate-500 rounded-b-2xl"
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
