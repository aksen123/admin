import { useState } from "react";
import Chart from "./Chart";

export default function ChartBoard({ storeCode }: { storeCode: string }) {
  const [view, setView] = useState<string>("day");
  enum ChartBoard {
    year = "year",
    month = "month",
    day = "day",
  }
  return (
    <div className="h-full">
      <h2 className="w-full  text-xl font-bold mb-10">매출 차트</h2>
      <div className="flex justify-around bg-white rounded-t-2xl">
        <button
          onClick={() => {
            setView(ChartBoard.year);
          }}
          className={`flex-1 text-center font-semibold p-3 ${
            view === ChartBoard.year
              ? "border-b-2 border-blue-600 text-blue-600"
              : null
          }`}
        >
          연도별
        </button>
        <button
          onClick={() => {
            setView(ChartBoard.month);
          }}
          className={`flex-1 text-center font-semibold p-3 ${
            view === ChartBoard.month
              ? "border-b-2 border-blue-600 text-blue-600"
              : null
          }`}
        >
          월별
        </button>
        <button
          onClick={() => {
            setView(ChartBoard.day);
          }}
          className={`flex-1 text-center font-semibold p-3 ${
            view === ChartBoard.day
              ? "border-b-2 border-blue-600 text-blue-600"
              : null
          }`}
        >
          일별
        </button>
      </div>
      <Chart storeCode={storeCode} />
    </div>
  );
}
