import { NextRequest } from "next/server";
import { Food } from "@/types/service";
import db from "@/app/service/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface DataType {
  foods: Food[];
  store: string;
}

export async function POST(request: NextRequest) {
  const data: DataType = await request.json();
  const store = data.store;
  data.foods.forEach((food, i) => {
    const menu = doc(db, store == "SYSTEM" ? "default-menu" : "menu", food.id);
    updateDoc(menu, {
      sort: i,
    });
  });
  return Response.json({ success: true });
}

// db 경로 수정하기 ㅁ
