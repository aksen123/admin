"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/user-atom";
import Super from "./Super";
import { enumAdmin } from "@/types/enum";
import Admin from "./Admin";

const Aside = () => {
  const user = useRecoilValue(userState);
  const userCheck = user?.auth.includes(enumAdmin.super);
  return (
    user && (
      <aside className="w-[30%] max-w-[200px] border-r-2 border-r-gray-300">
        {userCheck ? <Super /> : <Admin />}
      </aside>
    )
  );
};

export default Aside;
