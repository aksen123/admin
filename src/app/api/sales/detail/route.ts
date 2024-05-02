import db from "@/app/service/firebase";
import { Sales } from "@/types/service";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const store = searchParams.get("store");

  const payments = query(
    collection(db, "payments"),
    where("date", ">=", start && +start),
    where("date", "<=", end && +end),
    where("store", "==", store)
  );

  const getPayment = await getDocs(payments);
  const data = getPayment.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Sales[];

  const dateTotal = data.reduce((prev, curr) => prev + curr.total, 0);

  return Response.json({
    success: true,
    data: { sales: data, total: dateTotal, count: data.length },
  });
}
