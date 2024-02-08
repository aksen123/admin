import Calendar from "../Components/Calendar";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const page = () => {
  return (
    <article className="w-[90%] flex flex-col gap-10 py-10">
      <h2 className="text-2xl font-bold">3월 24일 매출 현황</h2>
      <div className="py-5 pl-4 bg-white shadow-xl rounded-xl grid grid-cols-3">
        <div className="flex items-center justify-between px-4 relative before:absolute before:w-[1px] before:h-full before:bg-black before:left-0 first:px-0 first:pr-4 first:before:w-0">
          <div>
            <span className="text-gray-400 text-sm">이번 달 매출 금액</span>
            <p className="font-semibold text-xl">123,000원</p>
          </div>
          <RiMoneyDollarCircleFill size={30} color="blue" />
        </div>
        <div className="flex items-center justify-between px-4 relative before:absolute before:w-[1px] before:h-full before:bg-black before:left-0 first:px-0 first:pr-4 ">
          <div>
            <span className="text-gray-400 text-sm">오늘 매출 금액</span>
            <p className="font-semibold text-xl">123,000원</p>
          </div>
          <RiMoneyDollarCircleFill size={30} color="blue" />
        </div>
        <div className="flex items-center justify-between px-4 relative before:absolute before:w-[1px] before:h-full before:bg-black before:left-0 first:px-0 first:pr-4">
          <div>
            <span className="text-gray-400 text-sm">오늘 매출 건수</span>
            <p className="font-semibold text-xl">10건</p>
          </div>
          <RiMoneyDollarCircleFill size={30} color="blue" />
        </div>
      </div>
      <Calendar />
    </article>
  );
};

export default page;
