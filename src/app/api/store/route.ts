import db from "@/app/service/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  const storeCollection = await getDocs(collection(db, "stores"));
  const stores = storeCollection.docs.map((doc) => {
    return doc.id;
  });
  console.log("stores ::: ", stores);
  return Response.json({ success: true, data: stores });
}
