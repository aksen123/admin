import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

export default function Chart({ storeCode }: { storeCode: string }) {
  const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const options: ApexOptions = {
    theme: {
      mode: "light",
    },
    chart: {
      type: "line",
      height: 100,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  };
  const series = [
    { name: "test", data: [100, 200, 300, 400, 500, 100, 500, 200, 200, 100] },
  ];
  return (
    <div className="w-full p-8 bg-white rounded-b-2xl min-h-screen h-fit">
      <span>{storeCode} 점</span>
      <ApexChart options={options} series={series} />
    </div>
  );
}
