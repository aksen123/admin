import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function Chart({ storeCode }: { storeCode: string }) {
  const options: ApexOptions = {
    theme: {
      mode: "light",
    },
    chart: {
      type: "line",
      height: 250,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  };
  const series = [
    { name: "test", data: [100, 200, 300, 400, 500, 100, 500, 200, 700, 1000] },
  ];
  return (
    <div className="w-full p-8 bg-white rounded-b-2xl min-h-screen h-fit">
      <ReactApexChart options={options} series={series} />
    </div>
  );
}
