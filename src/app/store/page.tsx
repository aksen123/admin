"use client";

import { useSearchParams } from "next/navigation";
import SalesPage from "../Components/Sales";
import { useState } from "react";
import Management from "../Components/Management";
import ChartBoard from "../Components/chart/ChartBoard";

enum ViewType {
  menu = "menu",
  calendar = "calendar",
  chart = "chart",
}
export default function page() {
  const searchParams = useSearchParams();
  const store = searchParams.get("name");
  const code = searchParams.get("code");
  const [viewSwitch, SetViewSwitch] = useState<ViewType>(ViewType.calendar);
  return (
    code && (
      <article className="p-8 w-full">
        <div className="w-full flex items-center justify-between gap-6 my-5">
          <h1 className="text-2xl font-semibold">{store}점 관리 페이지</h1>
          <div>
            <button
              onClick={() => SetViewSwitch(ViewType.calendar)}
              className={`inline-block p-2 mr-5 ${
                viewSwitch === ViewType.calendar
                  ? "bg-white rounded-xl text-blue-600"
                  : "bg-blue-600 rounded-xl text-white"
              }`}
            >
              매출 달력
            </button>
            <button
              onClick={() => SetViewSwitch(ViewType.chart)}
              className={`inline-block p-2 mr-5 ${
                viewSwitch === ViewType.chart
                  ? "bg-white rounded-xl text-blue-600"
                  : "bg-blue-600 rounded-xl text-white"
              }`}
            >
              매출 차트
            </button>
            <button
              onClick={() => SetViewSwitch(ViewType.menu)}
              className={`inline-block p-2 ${
                viewSwitch === ViewType.menu
                  ? "bg-white rounded-xl text-blue-600"
                  : "bg-blue-600 rounded-xl text-white"
              }`}
            >
              메뉴 관리
            </button>
          </div>
        </div>

        {viewSwitch === ViewType.menu && <Management storeCode={code} />}
        {viewSwitch === ViewType.calendar && <SalesPage storeCode={code} />}
        {viewSwitch === ViewType.chart && <ChartBoard storeCode={code} />}
      </article>
    )
  );
}
