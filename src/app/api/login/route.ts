import { Login, User } from "@/types/service";
import { NextRequest } from "next/server";
import crypto from "crypto";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
    const user = getUser.docs.map((el: QueryDocumentSnapshot) => {
      return { id: el.id, ...el.data() };
    })[0] as User;
    const { userPassword, ...userData } = user;

    const encoded = Buffer.from(JSON.stringify(userData), "utf-8").toString(
      "base64"
    );
    const decoded = JSON.parse(
      Buffer.from(encoded, "base64").toString("utf-8")
    );
    console.log(encoded, decoded);
    return Response.json({ success: true, data: encoded });
  }
}
