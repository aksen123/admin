"use client";
import useSWR from "swr";
import { getOrder } from "../service/order";
import { useRouter } from "next/navigation";

interface TableProps {
  store: string;
}
export default function Table({ store }: TableProps) {
  const { data } = useSWR([`/api/order`, store], () => getOrder.get(store));

  const router = useRouter();
  const onClick = () => {
    router.push(`/store?name=${store}`);
  };
  return (
    <div
      className="bg-white rounded-xl w-full p-2 flex flex-col justify-start"
      onClick={onClick}
    >
      <p className="text-2xl text-blue-500 font-semibold mb-5">{store}지점</p>
      <p>주문 건수 : {data?.count}건</p>
      <p>매출 : {data?.total.toLocaleString()}원</p>
    </div>
  );
}
