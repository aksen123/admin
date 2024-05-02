import React from "react";
import Link from "next/link";
import { FcSalesPerformance } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import useSWR from "swr";
import { storeApi } from "@/app/service/store";
import { FaStore } from "react-icons/fa";

export default function Super() {
  const { data } = useSWR("/api/store", () => storeApi.list());

  return (
    <nav>
      <ul className="w-full p-3 border-b-2 border-b-gray-300 space-y-3 mt-4">
        <li>
          <Link
            className="group flex items-center gap-2 w-fit"
            href={"/dashboard"}
          >
            <FcSalesPerformance />
            <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
              대시보드
            </span>
          </Link>
        </li>
        <li>
          <Link
            className="group flex items-center gap-2 w-fit"
            href={"/addStore"}
          >
            <FcAddDatabase />
            <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
              지점추가
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
      <ul className="space-y-3 p-3">
        {data?.map((store, index) => (
          <li key={index}>
            <Link
              className="group flex items-center gap-2 w-fit"
              href={`/store?name=${store.name}&code=${store.code}`}
            >
              <FaStore color="blue" />
              <span className=" duration-300 group-hover:text-blue-600 group-hover:font-semibold">
                {store.name}점
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
