"use client";

import useSWR from "swr";
import Table from "./Components/Table";
import { getOrder } from "./service/order";

export default function Home() {
  const { data, isLoading } = useSWR("/api/order", () => getOrder.list());
  console.log(data);
  const arr = new Array(12).fill(1);

  return (
    <div className="w-full min-h-full h-fit grid grid-cols-4 justify-center items-center gap-8 p-5">
      {arr.map((el, i) => {
        const order = data?.find((el) => el.id && +el.id == i + 1);
        console.log(order);
        return (
          <div key={i}>
            <Table number={i + 1} />
          </div>
        );
      })}
    </div>
  );
}
