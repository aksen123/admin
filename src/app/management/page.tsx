"use client";

import { FaPlus } from "react-icons/fa";
import useSWR from "swr";
import { foodsService } from "../service/foods";

import React from "react";

export default function ManagementPage() {
  const { data } = useSWR("/api/menu", () => foodsService.get());

  return (
    <article className="w-full h-[calc(100vh-3rem)] max-h-fit p-10 bg-white flex flex-col">
      <h2 className="text-2xl font-bold">메뉴 관리</h2>
      <div className="w-full mt-8 mb-2 flex justify-end">
        <button className="p-2 rounded-lg bg-blue-600 text-white flex items-center">
          <FaPlus className="inline-block mr-1" />
          메뉴 추가하기
        </button>
      </div>
      <table className="border-y-2 border-y-gray-100">
        <thead className="text-left">
          <tr className="bg-gray-200">
            <th className="border-2 border-l-0 border-gray-300 p-2">메뉴 명</th>
            <th className="border-2 border-gray-300 p-2">가격</th>
            <th className="border-2 border-gray-300 p-2">품절</th>
            <th className="w-20 text-center border-2 border-gray-300 p-2">
              수정
            </th>
            <th className="w-20 text-center border-2 border-r-0 border-gray-300 p-2">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((food, i) => (
            <tr key={i}>
              <td className="border-2 border-l-0 border-gray-300 p-2">
                {food.name}
              </td>
              <td className="border-2 border-gray-300 p-2">
                {food.price.toLocaleString()}원
              </td>
              <td className="border-2 border-gray-300">
                <span
                  className={`
                    ml-2 p-2 text-xs font-medium me-2 px-2.5 py-0.5 rounded
                    ${
                      food.soldOut
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }
                 `}
                >
                  {food.soldOut ? "품절" : "판매가능"}
                </span>
              </td>
              <td className="border-2 border-gray-300 p-2 text-center">
                <button className="text-gray-500 rounded-xl p-2 bg-gray-200 font-semibold ">
                  수정
                </button>
              </td>
              <td className="border-2 border-r-0 border-gray-300 p-2 text-center">
                <button className="text-red-500 rounded-xl p-2 bg-red-200 font-semibold ">
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
