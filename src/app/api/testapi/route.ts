import db from "@/app/service/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  console.log(searchParams.get("store"), "get api!!");
  const store = searchParams.get("store");
  const test = collection(db, "default-menu");
  const test2 = query(
    collection(db, "menu"),
    where("store", "==", "10"),
    where("name", "==", "떡볶이")
  );
  const data = (await getDocs(test)).docs.map((el) => el.data());
  const data2 = (await getDocs(test2)).docs.map((el) => el.data());
  const testData = (await getDocs(test2)).empty; // 조건식으로 거른 데이터가 비어있으면 true
  const data3 = doc(db, "default-menu", "1");
  updateDoc(data3, {
    name: "떡볶이이",
  });
  // console.log("data :: ", data, "data2 ::", data2);
  console.log("empty ::: ", testData);
  return Response.json({ success: true, data: "" });
}

export async function POST() {
  const newMenu = await addDoc(collection(db, "default-menu"), {
    name: "test1",
    price: 50000,
    sort: 2,
  });
  updateDoc(doc(db, "default-menu", newMenu.id), {
    unique: newMenu.id,
  });
  console.log("post api !!!!!", newMenu.id);
  return Response.json({ success: true });
}
