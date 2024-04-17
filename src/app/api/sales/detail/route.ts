import db from "@/app/service/firebase";
import { Menu, Sales } from "@/types/service";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const store = searchParams.get("store");

  console.log(start, end, store);

  const payments = query(
    collection(db, "payments"),
    where("date", ">=", start && +start),
    where("date", "<=", end && +end),
    where("store", "==", store)
  );

  const getPayment = await getDocs(payments);
  let data = getPayment.docs.map((doc) => ({
    ...doc.data(),
  })) as Sales[];

  let dateTotal = data.reduce((prev, curr) => prev + curr.total, 0);

  return Response.json({
    success: true,
    data: { sales: data, total: dateTotal, count: data.length },
  });
}
