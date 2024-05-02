"user client";

import useUserInfo from "@/app/hooks/useUserInfo";
import { getOrder } from "@/app/service/order";
import { ViewBoard } from "@/types/enum";
import React, { useState } from "react";
import useSWR from "swr";
import Card from "./Card";

export default function Admin({ store }: { store: string }) {
  const user = useUserInfo()?.store as string;
  const { data } = useSWR(store ? `/api/order` : null, () =>
    getOrder.getStore(store)
  );
  console.log(store, data);
  const [view, setView] = useState<string>("wait");

  const onClick = (text: string) => {
    setView(text);
  };
  return (
    data && (
      <div>
        <div className="flex justify-around">
          <button
            onClick={() => {
              onClick(ViewBoard.wait);
            }}
            className={`flex-1 text-center font-semibold p-2 ${
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
            className={`flex-1 text-center font-semibold p-2 ${
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
            className={`flex-1 text-center font-semibold p-2 ${
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
