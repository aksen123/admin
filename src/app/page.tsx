"use client";

import useSWR from "swr";
import Table from "./Components/Table";
import { storeApi } from "./service/store";

export default function Home() {
  const { data: stores = [] } = useSWR("/api/store", () => storeApi.list());

  return (
    <div className="w-full min-h-full h-fit grid grid-cols-4 justify-center items-start gap-8 p-5">
      {stores.map((store, index) => (
        <Table key={index} code={store.code} name={store.name} />
      ))}
    </div>
  );
}
