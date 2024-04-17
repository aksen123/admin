"use client";

import { useSearchParams } from "next/navigation";
import SalesPage from "../Components/Sales";
import { useState } from "react";
import Management from "../Components/Management";

export default function page() {
  const searchParams = useSearchParams();
  const store = searchParams.get("name");
  const code = searchParams.get("code");
  const [viewSwitch, SetViewSwitch] = useState(true);
  return (
    <article className="p-8 w-full">
      <div className="w-full flex items-center justify-between gap-6 my-5">
        <h1 className="text-2xl font-semibold">{store}점 관리 페이지</h1>
        <div>
          <button
            onClick={() => SetViewSwitch(true)}
            className={`inline-block p-2 mr-5 ${
              viewSwitch
                ? "bg-blue-600 rounded-xl text-white"
                : "bg-white rounded-xl text-blue-600"
            }`}
          >
            매출 달력
          </button>
          <button
            onClick={() => SetViewSwitch(false)}
            className={`inline-block p-2 ${
              viewSwitch
                ? "bg-white rounded-xl text-blue-600"
                : "bg-blue-600 rounded-xl text-white"
            }`}
          >
            메뉴 관리
          </button>
        </div>
      </div>
      {viewSwitch ? (
        <SalesPage storeCode={code} />
      ) : (
        <Management storeCode={code} />
      )}
    </article>
  );
}
