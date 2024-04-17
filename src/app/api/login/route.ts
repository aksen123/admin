import { Login, User } from "@/types/service";
import { NextRequest } from "next/server";
import crypto from "crypto";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/app/service/firebase";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as Login;
  const { id, password } = data;
  const encryption = crypto.createHash("sha256").update(password).digest("hex");

  const getUser = await getDocs(
    query(
      collection(db, "users"),
      where("userId", "==", id),
      where("userPassword", "==", encryption)
    )
  );
  if (getUser.empty) {
    return Response.json(
      {
        success: false,
        error: { message: "아이디 또는 비밀번호가 일치하지 않습니다" },
      },
      { status: 500 }
    );
  } else {
    const user = getUser.docs.map((el) => {
      return { id: el.id, ...el.data() };
    })[0] as User;
    const { store, name, userId, auth, id } = user;
    const userData = { store, name, userId, auth, id };
    return Response.json({ success: true, data: userData });
  }
}
