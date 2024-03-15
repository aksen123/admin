import { NextRequest } from "next/server";
import { Params } from "../menu/[slug]/route";
import db from "@/app/service/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(request: NextRequest) {
  const orderCollection = await getDocs(collection(db, "orders"));
  const data = orderCollection.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return Response.json({ success: true, data });
}
