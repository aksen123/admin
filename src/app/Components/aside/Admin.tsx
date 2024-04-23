import React from "react";
import Link from "next/link";
import { FcServices } from "react-icons/fc";

export default function Admin() {
  return (
    <nav>
      <ul className="space-y-3 p-3">
        <li>
          <Link
            className="group flex items-center gap-2 w-fit"
            href={"/dashboard"}
          >
            <FcServices />
            <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
              대시보드
            </span>
          </Link>
        </li>
        <li>
          <Link className="group flex items-center gap-2 w-fit" href={"/sales"}>
            <FcServices />
            <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
              매출달력
            </span>
          </Link>
        </li>
        <li>
          <Link
            className="group flex items-center gap-2 w-fit"
            href={"/management"}
          >
            <FcServices />
            <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
              메뉴관리
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
