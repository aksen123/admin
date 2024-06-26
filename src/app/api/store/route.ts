/* eslint-disable @typescript-eslint/no-unused-vars */
import db from "@/app/service/firebase";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { AddStore } from "@/types/service";
import { storeApi } from "@/app/service/store";
import { foodsService } from "@/app/service/foods";
import { EnumAuth } from "@/types/enum";

export async function GET() {
  const storeCollection = await getDocs(collection(db, "stores"));
  const stores = storeCollection.docs.map((doc) => {
    return { code: doc.id, name: doc.get("name") };
  });
  return Response.json({ success: true, data: stores });
}

export async function POST(request: NextRequest) {
  const formData: AddStore = await request.json();
  const {
    address,
    phone,
    name,
    taxId,
    storeName,
    birthDate,
    userPassword,
    userId,
  } = formData;
  const stores = await storeApi.list();
  if (stores.find((el) => el.name === formData.storeName)) {
    return Response.json(
      {
        success: false,
        error: { message: "같은 이름의 지점명이 있습니다." },
      },
      { status: 500 }
    );
  }
  const usersCollection = await getDocs(collection(db, "users"));
  const usersID = usersCollection.docs.map((el) => el.get("userId"));
  if (usersID.find((el) => el === userId)) {
    return Response.json(
      {
        success: false,
        error: { message: "중복된 아이디가 있습니다." },
      },
      { status: 500 }
    );
  }
  const menus = (await foodsService.get(EnumAuth.super)).map(
    ({ id, ...rest }) => rest
  );
  const maxNumber = Math.max(...stores.map((el) => +el.code));
  const newCode = maxNumber < 0 ? "1" : `${maxNumber + 1}`;
  const password = crypto
    .createHash("sha256")
    .update(userPassword)
    .digest("hex");
  const storeInfo = {
    name: storeName,
    license: taxId,
    store: newCode,
    address,
    phone,
  };
  const userInfo = {
    birthDate,
    name,
    userId,
    phone,
    userPassword: password,
    store: newCode,
    auth: ["ADMIN"],
  };
  menus.map((menu) =>
    setDoc(doc(db, "menu", `${newCode}_${menu.unique}`), {
      ...menu,
      store: newCode,
    })
  );
  await setDoc(doc(db, "stores", newCode), storeInfo);
  await addDoc(collection(db, "users"), userInfo);
  return Response.json({
    success: true,
    data: `${storeName}점 등록이 완료 되었습니다.`,
  });
}
