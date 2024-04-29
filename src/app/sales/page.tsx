"use client";

import useUserInfo from "../hooks/useUserInfo";
import { EnumAuth } from "@/types/enum";
import SalesPage from "../Components/Sales";

export default function Page() {
  const user = useUserInfo();
  const code = user?.auth.includes(EnumAuth.super)
    ? EnumAuth.super
    : (user?.store as string);

  return (
    user && (
      <article className="p-8 w-full">
        <SalesPage storeCode={code} />
      </article>
    )
  );
}
