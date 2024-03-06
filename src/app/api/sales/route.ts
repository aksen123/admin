import db from "@/app/service/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
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

  // {
  //   startDate: "2024-02-25",
  //   endDate: "2024-04-06"
  // }

  // 42 = dayjs(endDate).subtract(startDate, "day")

  const calendars = [];
  for (let i = 0; i < 42; i += 1) {
    // dayjs(startDate).add(i, "day")
    calendars.push({
      totalPrice: 0,
      count: 0,
    });
  }

  // 0 - 25
  // 41 = 06

  // [
  //   {
  //     price
  //   }
  // ]

  // console.log(data);

  return Response.json({
    success: true,
    data,
    // data: {
    //   totalPrice: 0,
    //   totalSalesCount: 0,
    //   calendars,
    // },
  });
}
