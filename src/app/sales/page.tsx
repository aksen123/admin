"use client";

import useUserInfo from "../hooks/useUserInfo";
import { EnumAuth } from "@/types/enum";
import SalesPage from "../Components/Sales";

export default function Page() {
  const user = useUserInfo();
  const code = user?.auth.includes(EnumAuth.super)
    ? EnumAuth.super
    : (user?.store as string);

  // 추가 해야함 >>> EnumAuth.super 일때 들어오면 /dashboard로 보내주기
  return (
    user && (
      <article className="p-8 w-full">
        <SalesPage storeCode={code} />
      </article>
    )
  );
}
