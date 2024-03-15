import db from "@/app/service/firebase";
import { Order } from "@/types/service";
import { doc, getDoc } from "firebase/firestore";

export interface Params {
  params: {
    slug: string;
  };
}

export async function GET(requset: Request, context: Params) {
  console.log("context.params.slug: ", context.params.slug);
  const order = await getDoc(doc(db, "orders", context.params.slug));
  const data: Order[] = order.data()?.orders as Order[];
  const orders = data.map(({ order }) => JSON.parse(order));

  orders.map((item) => {});

  return Response.json({ success: true, data });
}
