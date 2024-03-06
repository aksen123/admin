import db from "@/app/service/firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const payments = query(
    collection(db, "payment"),
    where("date", ">=", start && +start),
    where("date", "<=", end && +end)
  );
  const getPayment = await getDocs(payments);
  const data = getPayment.docs.map((doc) => ({
    ...doc.data(),
  }));

  return Response.json({ success: true, data: data });
}
