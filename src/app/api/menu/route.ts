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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

interface DataType {
  [k: string]: FormDataEntryValue;
}

export async function GET() {
  const foodCollection = await getDocs(collection(db, "foods"));
  const data = foodCollection.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return Response.json({ success: true, data: data });
}

export async function POST(request: NextRequest) {
  // const food: Food = await request.json();
  const formData = await request.formData();
  const file = formData.get("file") as File;
  console.log("file>>", file, typeof file);
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => !el.includes("file"))
  );

  const check = await getDoc(doc(db, "foods", data.name as string));
  console.log(data);
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
    console.log("image O", file);
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
    console.log("image X");
    setDoc(doc(db, "foods", data.name as string), {
      ...data,
      price: +data.price,
    });
    return Response.json({ success: true });
  }
}

// 수정 전 수정 후 메뉴 이름 같으면 file 유무 확인후 기존 아이디에 수정사항 집어 넣기
// 메뉴 이름이 다르면 기존 메뉴 삭제후 수정사항의 메뉴 이름으로 새로 집어 넣기!
// 위 둘과 별개로 기존 src가 있으면 그대로 넣고 기존 scr가 없고 file이 들어왔으면 업로드후 scr에 넣기 (scr, file 둘다 없으면 빈값으로 넣기)

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const origin = formData.get("origin");
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter(
      (el) => !el.includes("file") && !el.includes("origin")
    )
  );

  if (data.name === origin) {
    const originMenu = doc(db, "foods", origin as string);
    if (typeof file != "string") {
      const storageRef = ref(firebaseApp, `menu/${file.name}`);
      uploadBytes(storageRef, file as File).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateDoc(originMenu, {
            ...data,
            price: +data.price,
            soldOut: data.soldOut == "true",
            src: url,
          });
        });
      });
    } else {
      await updateDoc(originMenu, {
        ...data,
        price: +data.price,
        soldOut: data.soldOut == "true",
      });
    }
  } else {
    await deleteDoc(doc(db, "foods", origin as string));
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
        price: +data.price,
      });
      return Response.json({ success: true });
    }
  }
  console.log(data, file, origin);
  return Response.json({ success: true });
}
