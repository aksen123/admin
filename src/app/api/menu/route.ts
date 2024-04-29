import {
  getDocs,
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
} from "firebase/firestore";
import db, { firebaseApp } from "@/app/service/firebase";
import { NextRequest } from "next/server";
import { Food } from "@/types/service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storeApi } from "@/app/service/store";
import { EnumAuth } from "@/types/enum";
interface DataType {
  [k: string]: FormDataEntryValue;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");
  const data = await getData(store);

  return Response.json({ success: true, data: data });
}

const getData = async (store: string | null) => {
  const menus =
    store == EnumAuth.super
      ? await getDocs(collection(db, "default-menu"))
      : await getDocs(
          query(collection(db, "menu"), where("store", "==", store))
        );
  const data = menus.docs
    .map((el) => ({ id: el.id, sort: el.get("sort"), ...el.data() }))
    .sort((a, b) => a.sort - b.sort);
  return data;
};

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => !el.includes("file"))
  );
  // // TODO: 이미 등록된 음식인지 체크
  const check = await checkDuplicate(store as string, data.name as string);
  if (!check) {
    return Response.json(
      {
        success: false,
        error: { message: "이미 등록된 음식입니다." },
      },
      { status: 500 }
    );
  }

  if (typeof file != "string") {
    const storageRef = ref(firebaseApp, `menu/${file.name}`);
    uploadBytes(storageRef, file as File).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setMenu(data, store, url);
      });
    });
    return Response.json({ success: true });
  } else {
    await setMenu(data, store);
    return Response.json({ success: true });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const documentID = formData.get("id");
  const origin = formData.get("origin");
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter(
      (el) => !el.includes("file") && !el.includes("origin")
    )
  );
  const check = await checkDuplicate(store as string, data.name as string);
  console.log("documentID ::", documentID);
  const originMenu = doc(
    db,
    store == EnumAuth.super ? "default-menu" : "menu",
    documentID as string
  );

  let updateData: { [key: string]: any } = {
    ...data,
    price: +data.price,
    sort: +data.sort,
    soldOut: data.soldOut == "true",
    hide: data.hide == "true",
  };
  if (!check && data.name !== origin) {
    return Response.json(
      {
        success: false,
        error: { message: "같은 이름의 메뉴가 있습니다." },
      },
      { status: 500 }
    );
  }
  if (typeof file != "string") {
    const storageRef = ref(firebaseApp, `menu/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file as File);
    const imgUrl = await getDownloadURL(snapshot.ref);
    updateData.src = imgUrl;
  }

  await updateDoc(originMenu, updateData);

  if (store == EnumAuth.super) {
    const stores = await storeApi.list();
    stores.map((el) => {
      const store = doc(db, "menu", `${el.code}_${documentID}`);
      updateDoc(store, updateData);
    });
  }
  return Response.json({ success: true });
}

const setMenu = async (data: DataType, store: string | null, url?: string) => {
  const addData = {
    ...data,
    sort: +data.sort,
    price: +data.price,
    src: url ? url : null,
    soldOut: data.soldOut === "true",
    hide: data.hide === "true",
  };
  if (store == EnumAuth.super) {
    const stores = await storeApi.list();
    const newMenu = doc(collection(db, "default-menu"));
    await setDoc(newMenu, { ...addData, unique: newMenu.id });
    stores.forEach((el) => {
      setDoc(doc(db, "menu", el.code + "_" + newMenu.id), {
        ...addData,
        store: el.code,
      });
    });
  } else {
    const newMenu = doc(collection(db, "menu"));
    const documentID = store + `_${newMenu.id}`;
    await setDoc(doc(db, "menu", documentID), {
      ...addData,
      unique: newMenu.id,
    });
  }
};

const checkDuplicate = async (store: string, menu: string) => {
  const check =
    store == EnumAuth.super
      ? await getDocs(
          query(collection(db, "default-menu"), where("name", "==", menu))
        )
      : await getDocs(
          query(
            collection(db, "menu"),
            where("name", "==", menu),
            where("store", "==", store)
          )
        );

  return check.empty;
};
