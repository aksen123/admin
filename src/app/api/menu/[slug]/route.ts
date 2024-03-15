import db from "@/app/service/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export interface Params {
  params: {
    slug: string;
  };
}

export async function DELETE(request: NextRequest, context: Params) {
  console.log(context.params.slug);
  const food = await getDoc(doc(db, "foods", context.params.slug));

  if (!food) {
    return Response.json(
      {
        success: false,
        error: { message: "조회되지 않는 아이디입니다." },
      },
      { status: 500 }
    );
  }

  await deleteDoc(doc(db, "foods", context.params.slug));

  return Response.json({ success: true });
}
