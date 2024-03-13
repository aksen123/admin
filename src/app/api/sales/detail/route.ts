import db from "@/app/service/firebase";
import { Sales } from "@/types/service";
import dayjs from "dayjs";
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

  let dateTotal = 0;

  data = data.map((payment) => {
    dateTotal += payment.totalPrice;
    const orders = {
      ...payment,
      orders: payment.orders.map((el) => {
        const data = { ...el, order: JSON.parse(el.order as string) };
        return data;
      }),
    };

    return orders;
  });

  return Response.json({
    success: true,
    data: { sales: data, total: dateTotal, count: data.length },
  });
}
