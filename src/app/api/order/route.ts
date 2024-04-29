import db from "@/app/service/firebase";
import { Sales } from "@/types/service";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const store = searchParams.get("store");
  console.log("🚀 ~ GET ~ store:", store);
  const today = dayjs();
  const payments = query(
    collection(db, "payments"),
    where("date", ">=", today.startOf("day").valueOf()),
    where("date", "<=", today.endOf("day").valueOf()),
    where("store", "==", store)
  );
  const data = (await getDocs(payments)).docs.map((el) => el.data()) as Sales[];
  console.log("🚀 ~ GET ~ data:", data);
  const todaySales = {
    count: data.length,
    total: data.reduce((prev, curr) => prev + curr.total, 0),
    sales: data,
  };
  return Response.json({ success: true, data: todaySales });
}
