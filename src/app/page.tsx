"use client";

import useSWR from "swr";
import Table from "./Components/Table";
import { storeApi } from "./service/store";

export default function Home() {
  const { data: stores = [] } = useSWR("/api/store", () => storeApi.list());
  console.log(stores);

  const table = {
    count: 1,
  };

  /**
   * TODO: *
   * 1. 테이블의 총 개수를 가져온다.
   * 2. 전체 개수의 테이블 정보 가져온다.
   *
   * const { data: tables } = useSWR("/api/tables", () => getOrder.list());
   * const { data: orders } = useSWR(tables.count ? "/api/tables" : null, () => getOrder.list());
   */

  return (
    <div className="w-full min-h-full h-fit grid grid-cols-4 justify-center items-start gap-8 p-5">
      {stores.map((store, index) => (
        <Table key={index} store={store} />
      ))}
    </div>
  );
}
