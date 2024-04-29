"use client";

import useUserInfo from "../hooks/useUserInfo";
import Super from "../Components/board/Super";
import Admin from "../Components/board/Admin";
import { EnumAuth } from "@/types/enum";

export default function page() {
  const user = useUserInfo();
  const check = user?.auth.includes(EnumAuth.super);
  const store = user && user.store;
  return (
    <article className="w-full">
      {check ? <Super /> : <Admin store={store as string} />}
    </article>
  );
}
