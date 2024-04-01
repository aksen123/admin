import db from "@/app/service/firebase";
import { Calendars, Menu, Sales } from "@/types/service";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const store = searchParams.get("store");

  console.log(start, end, store);
  const dateDifference = dayjs(end && +end).diff(start && +start, "day");

  const prevMonth = dayjs(start && +start);
  const range = {
    start: prevMonth.startOf("month").valueOf(),
    end: prevMonth.endOf("month").valueOf(),
  };
  const prevPayments = query(
    collection(db, "stores", store as string, "payment"),
    where("date", ">=", range.start),
    where("date", "<=", range.end)
  );

  const payments = query(
    collection(db, "stores", store as string, "payment"),
    where("date", ">=", start && +start),
    where("date", "<=", end && +end)
  );
  const getPrevPayment = await getDocs(prevPayments);
  const getPayment = await getDocs(payments);

  let prevData = getPrevPayment.docs.map((doc) => ({
    ...doc.data(),
  })) as Sales[];

  let data = getPayment.docs.map((doc) => ({
    ...doc.data(),
  })) as Sales[];

  const prevTotal = prevData.reduce((acc, curr) => acc + curr.total, 0);

  const calendars: Calendars[] = [];
  let monthSales = 0;
  let monthSalesCount = 0;
  let monthOrderCount = 0;

  for (let i = 0; i <= dateDifference; i += 1) {
    const date = dayjs(start && +start).add(i, "day");
    const format = date.format("YYYY-MM-DD");
    const dateSales = data.filter(
      (payment) => dayjs(payment.date).format("YYYY-MM-DD") === format
    );
    const total = dateSales.reduce((acc, curr) => acc + curr.total, 0);
    if ((i < 7 && date.date() > 20) || (i > 20 && date.date() < 10)) {
      calendars.push({
        date: date.date(),
        total: null,
        format,
      });
    } else {
      monthSales += total;
      monthSalesCount += dateSales.reduce(
        (acc, curr) => acc + curr.order.length,
        0
      );
      // monthOrderCount += dateSales.reduce(
      //   (acc, curr) =>
      //     acc + curr.order.reduce((acc, curr) => acc + curr.order.length, 0),
      //   0
      // );

      calendars.push({
        date: date.date(),
        total: total,
        format,
      });
    }
  }
  const monthInfo = {
    total: monthSales,
    salesCount: monthSalesCount,
    orderCount: monthOrderCount,
    prevTotal,
  };
  return Response.json({
    success: true,
    data: {
      monthInfo,
      calendars,
    },
  });
}

const percentage = (curr: number, prev: number) => {
  const subtract = curr - prev;
  const percent = prev == 0 ? 100 : (subtract / prev) * 100;
  return percent;
};
