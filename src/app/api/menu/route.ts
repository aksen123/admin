import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import db from "@/app/service/firebase";
import { NextRequest } from "next/server";
import { Food } from "@/types/service";
import { getStorage } from "firebase/storage";

export async function GET() {
  const foodCollection = await getDocs(collection(db, "foods"));
  const data = foodCollection.docs
    .map((doc) => ({
      id: doc.id,
      number: doc.get("number"),
      ...doc.data(),
    }))
    .sort((a, b) => a.number - b.number);
  return Response.json({ success: true, data: data });
}

export async function POST(request: NextRequest) {
  const food: Food = await request.json();
  const check = await getDoc(doc(db, "foods", food.name));
  // TODO: 이미 등록된 음식인지 체크

  if (check.data()) {
    return Response.json(
      {
        success: false,
        error: { message: "이미 등록된 음식입니다." },
      },
      { status: 500 }
    );
  }
  setDoc(doc(db, "foods", food.name), {
    ...food,
    price: +food.price,
    soldOut: false,
  });
  return Response.json({ success: true });
}
