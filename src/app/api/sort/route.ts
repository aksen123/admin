import { NextRequest } from "next/server";
import { Food } from "@/types/service";
import db from "@/app/service/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface DataType {
  [k: string]: FormDataEntryValue;
}

export async function POST(request: NextRequest) {
  const foods: Food[] = await request.json();

  foods.forEach((food, i) => {
    const menu = doc(db, "foods", food.name);
    updateDoc(menu, {
      sort: i,
    });
  });
  return Response.json({ success: true });
}
