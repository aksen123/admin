/* eslint-disable @typescript-eslint/no-unused-vars */
import { Login, User } from "@/types/service";
import { NextRequest } from "next/server";
import crypto from "crypto";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/app/service/firebase";
import { EnumAuth } from "@/types/enum";

interface UserData {
  id: string;
  auth: string[];
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as Login;
  const { id, password } = data;
  const encryption = crypto.createHash("sha256").update(password).digest("hex");

  const getUser = await getDocs(
    query(collection(db, "users"), where("userId", "==", id))
  );
  if (getUser.empty) {
    return Response.json(
      {
        success: false,
        error: { message: "일치하는 아이디가 없습니다" },
      },
      { status: 404 }
    );
  }

  const users = getUser.docs.map((el) => {
    return { id: el.id, ...el.data() };
  }) as User[];
  const user = users.find((el) => el.userPassword === encryption);

  if (!user) {
    return Response.json(
      {
        success: false,
        error: { message: "비밀번호가 일치하지 않습니다" },
      },
      { status: 401 }
    );
  }
  const { userPassword, ...userData } = user;

  const encoded = Buffer.from(JSON.stringify(userData), "utf-8").toString(
    "base64"
  );
  return Response.json({ success: true, data: encoded });
}

export async function GET() {
  const getUsers = await getDocs(collection(db, "users"));
  const getData: UserData[] = getUsers.docs.map((el) => {
    return { id: el.get("userId"), auth: el.get("auth") };
  });
  const data = getData.map((el) => {
    return { ...el, auth: el.auth.includes(EnumAuth.super) ? "전체" : "일반" };
  });
  return Response.json({ success: true, data });
}
