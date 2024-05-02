"use client";

import { EnumAuth } from "@/types/enum";
import Management from "../Components/Management";
import useUserInfo from "../hooks/useUserInfo";

export default function ManagementPage() {
  const user = useUserInfo();
  const code = user?.auth.includes(EnumAuth.super)
    ? EnumAuth.super
    : (user?.store as string);

  return (
    <article className="w-full p-8">
      {user && <Management storeCode={code} />}
    </article>
  );
}
