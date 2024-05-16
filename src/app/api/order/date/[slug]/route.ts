import { Params } from "@/app/api/menu/[slug]/route";
import db from "@/app/service/firebase";
import { Sales } from "@/types/service";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: Params) {
  const { searchParams } = req.nextUrl;
  const { slug } = context.params;
  const store = searchParams.get("store");
  const today = dayjs(slug);
  const payments = query(
    collection(db, "payments"),
    where("date", ">=", today.startOf("day").valueOf()),
    where("date", "<=", today.endOf("day").valueOf()),
    where("store", "==", store)
  );
  const data = (await getDocs(payments)).docs.map((el) => ({
    ...el.data(),
    id: el.id,
  })) as Sales[];
  const complete = data.filter((el) => el.receipt && el.complete);
  const todaySales = {
    count: complete.length,
    total: complete.reduce((prev, curr) => prev + curr.total, 0),
    wait: data.filter((el) => !el.receipt && !el.complete),
    receipt: data.filter((el) => el.receipt && !el.complete),
    complete: complete,
  };
  return Response.json({ success: true, data: todaySales });
}
