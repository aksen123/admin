"user client";

import useUserInfo from "@/app/hooks/useUserInfo";
import { getOrder } from "@/app/service/order";
import React from "react";
import useSWR from "swr";

export default function Admin({store} : {store: string}) {
  const user = useUserInfo()?.store as string;
  const { data } = useSWR(store ?  `/api/order` : null, () => getOrder.getStore(store));
  console.log(store)
  return <div>Admin</div>;
}
