import db from "@/app/service/firebase";
import { ViewBoard } from "@/types/enum";
import { PostPayment } from "@/types/service";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const requestData = (await req.json()) as PostPayment;
  const { id, view } = requestData;
  const data = view === ViewBoard.wait ? { receipt: true } : { complete: true };
  const payment = doc(db, "payments", id);
  await updateDoc(payment, data);
  return Response.json({ success: true });
}
