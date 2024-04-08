import { NextRequest } from "next/server";
import { Params } from "../../menu/[slug]/route";
import dayjs from "dayjs";
import { Sales, StoreStatus } from "@/types/service";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/app/service/firebase";

export async function GET(request: NextRequest, context: Params) {
  const store = context.params.slug;

  const today = dayjs();
  const payments = query(
    collection(db, "stores", store as string, "payment"),
    where("date", ">=", today.startOf("day").valueOf()),
    where("date", "<=", today.endOf("day").valueOf())
  );
  const data = (await getDocs(payments)).docs.map((el) => el.data()) as Sales[];
  const status: StoreStatus = {
    count: data.length,
    total: data.reduce((prev, curr) => prev + curr.total, 0),
  };
  return Response.json({ success: true, data: status });
}
