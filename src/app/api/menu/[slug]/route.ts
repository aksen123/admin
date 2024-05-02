import db from "@/app/service/firebase";
import { EnumAuth } from "@/types/enum";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export interface Params {
  params: {
    slug: string;
  };
}

export async function DELETE(request: NextRequest, context: Params) {
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");
  const { slug } = context.params;
  const menuDoc = doc(
    db,
    store === EnumAuth.super ? "default-menu" : "menu",
    slug
  );
  const food = await getDoc(menuDoc);
  if (!food) {
    return Response.json(
      {
        success: false,
        error: { message: "조회되지 않는 아이디입니다." },
      },
      { status: 500 }
    );
  }

  await deleteDoc(menuDoc);

  return Response.json({ success: true });
}
