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

  const dateDifference = dayjs(end && +end).diff(start && +start, "day");

  const prevMonth = dayjs(start && +start);
  const range = {
    start: prevMonth.startOf("month").valueOf(),
    end: prevMonth.endOf("month").valueOf(),
  };
  const prevPayments = query(
    collection(db, "payments"),
    where("date", ">=", range.start),
    where("date", "<=", range.end),
    where("store", "==", store)
  );

  const payments = query(
    collection(db, "payments"),
    where("date", ">=", start && +start),
    where("date", "<=", end && +end),
    where("store", "==", store)
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
  let MonthTotal = 0;

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
      MonthTotal += total;

      calendars.push({
        date: date.date(),
        total: total,
        format,
      });
    }
  }
  const monthInfo = {
    total: MonthTotal,
    prevTotal,
    percentage: percentage(MonthTotal, prevTotal),
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

  const percent = (subtract / prev) * 100;

  if (percent == Infinity) {
    return 100;
  } else if (isNaN(percent)) {
    return 0;
  } else {
    return percent.toFixed(1);
  }
};
