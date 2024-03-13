"use client";

import Table from "./Components/Table";

export default function Home() {
  const arr = new Array(12).fill(1);
  console.log(arr);
  return (
    <div className="w-full min-h-full h-fit grid grid-cols-4 justify-center items-center gap-8 p-5">
      {arr.map((el, i) => {
        return (
          <div key={i}>
            <Table />
          </div>
        );
      })}
    </div>
  );
}
