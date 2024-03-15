import React from "react";
import useSWR from "swr";
import { getOrder } from "../service/order";

interface TableProps {
  number: number;
}
export default function Table({ number }: TableProps) {
  // const { data } = useSWR(`/api/order/`, () => getOrder.get(number));
  return (
    <div className="bg-white rounded-xl w-full h-40 p-2 flex flex-col justify-between">
      <p>{number}</p>
      <div className="line-clamp-4 h-2/3">
        <p>주문내역1</p>
        <p>주문내역2</p>
        <p>주문내역3</p>
        <p className="flex justify-between">
          <span>123</span>
          <span>456</span>
        </p>
        <p>주문내역5</p>
        <p>주문내역6</p>
        <p>주문내역7</p>
      </div>
      <p>금액</p>
    </div>
  );
}

// props로 테이블 번호를 받아 db에서 테이블 번호의 데이터를 받아와 뿌려준다 끝!
