import React from "react";
import ChartBoard from "../Components/chart/ChartBoard";

/**
 * 권환 확인 후 전체 관리권한이면 잘못된 접근이라고 띄워주기~~
 *
 */

export default function page() {
  return (
    <article className="w-full p-8">
      chart page
      <ChartBoard storeCode="3" />
    </article>
  );
}
