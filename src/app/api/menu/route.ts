import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db, { firebaseApp } from "@/app/service/firebase";
import { NextRequest } from "next/server";
import { Food } from "@/types/service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface DataType {
  [k: string]: FormDataEntryValue;
}

export async function GET() {
  const foodCollection = await getDocs(collection(db, "foods"));
  const data = foodCollection.docs
    .map((doc) => ({
      id: doc.id,
      sort: doc.get("sort"),
      ...doc.data(),
    }))
    .sort((a, b) => a.sort - b.sort);
  return Response.json({ success: true, data: data });
}

export async function POST(request: NextRequest) {
  // const food: Food = await request.json();
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => !el.includes("file"))
  );

  const check = await getDoc(doc(db, "foods", data.name as string));
  // TODO: 이미 등록된 음식인지 체크

  if (check.data()) {
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
        setDoc(doc(db, "foods", data.name as string), {
          ...data,
          price: +data.price,
          src: url,
          soldOut: data.soldOut === "true",
        });
      });
    });
    return Response.json({ success: true });
  } else {
    setDoc(doc(db, "foods", data.name as string), {
      ...data,
      sort: +data.sort,
      price: +data.price,
      soldOut: data.soldOut === "true",
    });
    return Response.json({ success: true });
  }
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const origin = formData.get("origin");
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter(
      (el) => !el.includes("file") && !el.includes("origin")
    )
  );
  const check = await getDoc(doc(db, "foods", data.name as string));
  console.log(check.data());
  if (data.name === origin) {
    const originMenu = doc(db, "foods", origin as string);
    if (typeof file != "string") {
      const storageRef = ref(firebaseApp, `menu/${file.name}`);
      uploadBytes(storageRef, file as File).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateDoc(originMenu, {
            ...data,
            price: +data.price,
            sort: +data.sort,
            soldOut: data.soldOut == "true",
            src: url,
          });
        });
      });
    } else {
      await updateDoc(originMenu, {
        ...data,
        sort: +data.sort,
        price: +data.price,
        soldOut: data.soldOut == "true",
      });
    }
  } else {
    if (check.data()) {
      console.log("중복!!");
      return Response.json(
        {
          success: false,
          error: { message: "같은 이름의 메뉴가 있습니다." },
        },
        { status: 500 }
      );
    }
    await deleteDoc(doc(db, "foods", origin as string));
    if (typeof file != "string") {
      const storageRef = ref(firebaseApp, `menu/${file.name}`);
      uploadBytes(storageRef, file as File).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setDoc(doc(db, "foods", data.name as string), {
            ...data,
            sort: +data.sort,
            price: +data.price,
            src: url,
            soldOut: data.soldOut === "true",
          });
        });
      });
      return Response.json({ success: true });
    } else {
      setDoc(doc(db, "foods", data.name as string), {
        ...data,
        sort: +data.sort,
        price: +data.price,
      });
      return Response.json({ success: true });
    }
  }
  console.log(data, file, origin);
  return Response.json({ success: true });
}
