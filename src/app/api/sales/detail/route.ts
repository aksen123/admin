import db from "@/app/service/firebase";
import { Sales } from "@/types/service";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const payments = query(
    collection(db, "payment"),
    where("date", ">=", start && +start),
    where("date", "<=", end && +end)
  );
  const getPayment = await getDocs(payments);
  let data = getPayment.docs.map((doc) => ({
    ...doc.data(),
  })) as Sales[];
  data = data.map((payment) => {
    const orders = {
      ...payment,
      orders: payment.orders.map((el) => {
        const data = { date: el.date, order: JSON.parse(el.order as string) };
        return data;
      }),
    };

    return orders;
  });
  return Response.json({ success: true, data: data });
}

// 그날의 총 매출 뽑아서 넣어주기 ?
