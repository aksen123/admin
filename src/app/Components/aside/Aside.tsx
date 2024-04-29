"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import Super from "./Super";
import useUserInfo from "@/app/hooks/useUserInfo";
import { EnumAuth } from "@/types/enum";
import Admin from "./Admin";

const Aside = () => {
  const [token, setToken] = useState<string>("");
  const pathname = usePathname();
  const user = useUserInfo();
  const userCheck = user?.auth.includes(EnumAuth.super);

  useEffect(() => {
    setToken(getCookie("TOKEN") as string);
  }, [pathname]);
  return (
    token && (
      <aside className="w-[30%] max-w-[200px] border-r-2 border-r-gray-300">
        {userCheck ? <Super /> : <Admin />}
      </aside>
    )
  );
};

export default Aside;
