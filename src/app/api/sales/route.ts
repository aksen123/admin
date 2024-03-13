import db from "@/app/service/firebase";
import { Calendars, Sales } from "@/types/service";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const dateDifference = dayjs(end && +end).diff(start && +start, "day");

  const prevMonth = dayjs(start && +start);
  const range = {
    start: prevMonth.startOf("month").valueOf(),
    end: prevMonth.endOf("month").valueOf(),
  };
  const prevPayments = query(
    collection(db, "payment"),
    where("date", ">=", range.start),
    where("date", "<=", range.end)
  );

  const payments = query(
    collection(db, "payment"),
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

  data = data.map((payment) => {
    const orders = {
      ...payment,
      orders: payment.orders.map((el) => {
        const data = { ...el, order: JSON.parse(el.order as string) };
        return data;
      }),
    };

    return orders;
  });

  const calendars: Calendars[] = [];
  let monthSales = 0;
  let monthSalesCount = 0;
  let monthOrderCount = 0;
  const prevTotal = prevData.reduce((acc, curr) => acc + curr.totalPrice, 0);

  for (let i = 0; i <= dateDifference; i += 1) {
    const date = dayjs(start && +start).add(i, "day");
    const format = date.format("YYYY-MM-DD");
    const dateSales = data.filter(
      (payment) => dayjs(payment.date).format("YYYY-MM-DD") === format
    );
    const total = dateSales.reduce((acc, curr) => acc + curr.totalPrice, 0);
    if ((i < 7 && date.date() > 20) || (i > 20 && date.date() < 10)) {
      calendars.push({
        date: date.date(),
        total: null,
        format,
      });
    } else {
      monthSales += total;
      monthSalesCount += dateSales.reduce(
        (acc, curr) => acc + curr.orders.length,
        0
      );
      monthOrderCount += dateSales.reduce(
        (acc, curr) =>
          acc + curr.orders.reduce((acc, curr) => acc + curr.order.length, 0),
        0
      );

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
  console.log(percentage(monthSales, prevTotal), monthSales, prevTotal);
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
