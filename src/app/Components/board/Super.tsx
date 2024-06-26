"use client";

import useSWR from "swr";
import { storeApi } from "@/app/service/store";
import Table from "../Table";

export default function Super() {
  const { data: stores = [] } = useSWR("/api/store", () => storeApi.list());

  return (
    <div className="w-full min-h-full h-fit grid grid-cols-4 justify-center items-start gap-8">
      {stores.map((store, index) => (
        <Table key={index} code={store.code} name={store.name} />
      ))}
    </div>
  );
}
