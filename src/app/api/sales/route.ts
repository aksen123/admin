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

  const payments = query(
    collection(db, "payment"),
    where("date", ">=", start && +start),
    where("date", "<=", end && +end)
  );
  const getPayment = await getDocs(payments);
  const data = getPayment.docs.map((doc) => ({
    ...doc.data(),
  })) as Sales[];

  const calendars: Calendars[] = [];
  let monthSales = 0;
  let monthSalesCount = 0;

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
      calendars.push({
        date: date.date(),
        total: total,
        format,
      });
    }
  }

  return Response.json({
    success: true,
    data: {
      totalPrice: monthSales,
      totalSalesCount: monthSalesCount,
      calendars,
    },
  });
}

// 서버에서 다 정리한다음 클라이언트로 보내주기 >> O
// 매출 상세 api도 따로 만들얼 줘야함
// 맨처음 이번달 달력이 출력 될때 오늘 날짜의 매출이 나와야함 (해당날짜에 표시도 돼야함)
// 달력에서 날짜를 클릭하면 그날짜의 매출이 나와야함
// 달력을 전 후 달로 바꾸면 그달의 1일 매출이 나오게 ( 전 후 달 날짜를 클릭해서 넘어가면 클릭한 날짜가 나오게 )

// 대시보드엔 테이블 수만큼 보여지게 해주면 됨 ( 일반 포스화면 처럼 )
// 키오스크 페이지 수정하기 >> 어드민에서 품절표시시 주문 못하게, 페이지 들어갈때 테이블 번호 입력해주기
