"use client";

import useSWR from "swr";
import { getOrder } from "../service/order";
import { StoreInfo } from "@/types/service";

export default function Table({ code, name }: StoreInfo) {
  const { data } = useSWR([`/api/order`, code], () => getOrder.get(code));

  return (
    <div className="bg-white rounded-xl w-full p-2 flex flex-col justify-start overflow-hidden">
      <p className="dashboard text-2xl text-blue-500 font-semibold mb-5 whitespace-nowrap overflow-hidden">
        {name}점
      </p>
      <p>주문 건수 : {data?.count}건</p>
      <p>매출 : {data?.total.toLocaleString()}원</p>
    </div>
  );
}
