import db from "@/app/service/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  const menuCollection = await getDocs(collection(db, "default-menu"));
  const data = menuCollection.docs
    .map((doc) => {
      return { id: doc.id, sort: doc.get("sort"), ...doc.data() };
    })
    .sort((a, b) => a.sort - b.sort);
  return Response.json({ success: true, data });
}
