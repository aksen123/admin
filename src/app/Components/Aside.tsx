import Link from "next/link";
import { FcSalesPerformance } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
const Aside = () => {
  return (
    <aside className="w-[30%] max-w-[200px] border-r-2 border-r-gray-300">
      <nav>
        <ul className="w-full p-3 border-b-2 border-b-gray-300 space-y-3 mt-4">
          <li>
            <Link className="group flex items-center gap-2 w-fit" href={"/"}>
              <FcSalesPerformance />
              <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
                대시보드
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="group flex items-center gap-2 w-fit"
              href={"/sales"}
            >
              <FcCalendar />
              <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
                매출 달력
              </span>
            </Link>
          </li>
          <div></div>

          <li>
            <Link
              className="group flex items-center gap-2 w-fit"
              href={"/management"}
            >
              <FcServices />
              <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
                메뉴 관리
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
