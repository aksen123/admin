"use client";

import { Food } from "@/types/service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import useSWR, { mutate } from "swr";
import AddFoodPopup from "../Components/modal/popup/AddFoodPopup";
import { foodsService } from "../service/foods";
import { defaultApi } from "../service/default";

export default function ManagementPage() {
  const { data: foods = [], isLoading } = useSWR("/api/menu", () =>
    foodsService.get("SYSTEM")
  );
  const [foodsData, setFoodsData] = useState<Food[]>([]);
  const [sortNumber, setSortNumber] = useState(0);
  const [isAddFoodPopup, setIsAddFoodPopup] = useState<boolean>(false);
  const [food, setFood] = useState<Food | null>(null);
  const editMenu = (food: Food) => {
    setFood(food);
    setIsAddFoodPopup(true);
  };

  const handleDelete = async (food: Food) => {
    window.yesNo(food.name, "정말로 삭제 하시겠습니까?", "삭제", async () => {
      await foodsService.delete(food.id, "SYSTEM").then(() => {
        alert(`${food.name} 메뉴가 삭제되었습니다.`);
        mutate("/api/menu");
      });
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setFoodsData(foods);
      console.log(foods);
      const maxNumber = Math.max(...foods.map((obj) => +obj.sort));
      setSortNumber(maxNumber < 0 ? 0 : maxNumber + 1);
      console.log("maxNumber : ", maxNumber);
    }
  }, [foods]);

  return (
    <article className="w-full min-h-[calc(100vh-3rem)] max-h-fit p-10 bg-white flex flex-col">
      <h2 className="text-2xl font-bold">메뉴 관리</h2>
      <div className="w-full mt-8 mb-2 flex justify-end">
        <button
          className="p-2 rounded-lg bg-blue-600 text-white flex items-center"
          onClick={() => setIsAddFoodPopup(true)}
        >
          <FaPlus className="inline-block mr-1" />
          메뉴 추가
        </button>
      </div>
      <table className="border-y-2 border-y-gray-100">
        <thead className="text-left">
          <tr className="bg-gray-200">
            <th className="border-2 border-l-0 border-gray-300 p-2">메뉴 명</th>
            <th className="border-2 border-gray-300 p-2">가격</th>
            <th className="border-2 border-gray-300 p-2">품절</th>
            <th className="border-2 border-gray-300 p-2">메뉴 활성화</th>
            <th className="w-20 text-center border-2 border-gray-300 p-2">
              수정
            </th>
            <th className="w-20 text-center border-2 border-r-0 border-gray-300 p-2">
              삭제
            </th>
          </tr>
        </thead>
        <ReactSortable
          tag={"tbody"}
          animation={200}
          list={foodsData}
          setList={() => {
            console.log("드래그~~~~~");
          }}
          onEnd={async (e: SortableEvent) => {
            console.log("드래그 끝~~");
            const list = [...foodsData];
            const obj = list.splice(e.oldIndex as number, 1);
            list.splice(e.newIndex as number, 0, ...obj);
            setFoodsData(list);
            await foodsService.sort(list, "SYSTEM");
          }}
        >
          {foodsData.map((food, i) => (
            <tr key={food.name + i}>
              <td className="border-2 border-l-0 border-gray-300 p-2">
                <Image
                  src={
                    food.src
                      ? food.src
                      : "http://placehold.it/50/808080/ffffff&text=menu"
                  }
                  width={50}
                  height={50}
                  alt="메뉴이미지"
                  className="inline-block mr-5"
                />
                <span>{food.name}</span>
              </td>
              <td className="border-2 border-gray-300 p-2">
                {food.price?.toLocaleString()}원
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
              <td className="border-2 border-gray-300">
                <span
                  className={`
                    ml-2 p-2 text-xs font-medium me-2 px-2.5 py-0.5 rounded
                    ${
                      food.hide
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }
                 `}
                >
                  {food.hide ? "비활성화" : "활성화"}
                </span>
              </td>
              <td className="border-2 border-gray-300 p-2 text-center">
                <button
                  className="text-gray-500 rounded-xl p-2 bg-gray-200 font-semibold "
                  onClick={() => {
                    editMenu(food);
                  }}
                >
                  수정
                </button>
              </td>
              <td className="border-2 border-r-0 border-gray-300 p-2 text-center">
                <button
                  onClick={() => {
                    handleDelete(food);
                  }}
                  className="text-red-500 rounded-xl p-2 bg-red-200 font-semibold "
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </ReactSortable>
      </table>

      {isAddFoodPopup && (
        <AddFoodPopup
          food={food}
          sort={sortNumber}
          storeCode={"SYSTEM"}
          onClose={() => {
            setIsAddFoodPopup(false);
            setFood(null);
          }}
        />
      )}
    </article>
  );
}
