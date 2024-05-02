import db from "@/app/service/firebase";
import { ViewBoard } from "@/types/enum";
import { PostPayment, Sales } from "@/types/service";
import dayjs from "dayjs";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const store = searchParams.get("store");
  const today = dayjs();
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

export async function POST(req: NextRequest) {
  const requestData = (await req.json()) as PostPayment;
  const { id, view } = requestData;
  const data = view === ViewBoard.wait ? { receipt: true } : { complete: true };
  const payment = doc(db, "payments", id);
  await updateDoc(payment, data);
  return Response.json({ success: true });
}
