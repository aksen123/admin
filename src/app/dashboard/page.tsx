"use client";

import useSWR from "swr";
import Table from "../Components/Table";
import { storeApi } from "../service/store";
import { useEffect } from "react";

export default function page() {
  const { data: stores = [] } = useSWR("/api/store", () => storeApi.list());
  useEffect(() => {
    // return 문으로 토큰없으면 첫페이지로 보내주기 위 데이터도 토큰 유무로 확인해주기
  });
  return (
    <div className="w-full min-h-full h-fit grid grid-cols-4 justify-center items-start gap-8 p-5">
      {stores.map((store, index) => (
        <Table key={index} code={store.code} name={store.name} />
      ))}
    </div>
  );
}
