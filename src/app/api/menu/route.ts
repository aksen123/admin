import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  DocumentSnapshot,
} from "firebase/firestore";
import db, { firebaseApp } from "@/app/service/firebase";
import { NextRequest } from "next/server";
import { Food } from "@/types/service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
interface DataType {
  [k: string]: FormDataEntryValue;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  console.log(searchParams.get("store"), "get api!!");
  const store = searchParams.get("store");
  const foodCollection = await getDocs(
    collection(db, "stores", store as string, "menu")
  );
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
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => !el.includes("file"))
  );

  const check = await getDoc(
    doc(db, "stores", store as string, "menu", data.name as string)
  );
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
        setDoc(
          doc(db, "stores", store as string, "menu", data.name as string),
          {
            ...data,
            price: +data.price,
            src: url,
            soldOut: data.soldOut === "true",
          }
        );
      });
    });
    return Response.json({ success: true });
  } else {
    setDoc(doc(db, "stores", store as string, "menu", data.name as string), {
      ...data,
      sort: +data.sort,
      price: +data.price,
      soldOut: data.soldOut === "true",
    });
    return Response.json({ success: true });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const store = searchParams.get("store");

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const origin = formData.get("origin");
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter(
      (el) => !el.includes("file") && !el.includes("origin")
    )
  );
  const check = await getDoc(
    doc(db, "stores", store as string, "menu", data.name as string)
  );
  console.log("check : ", check.data());
  if (data.name === origin) {
    const originMenu = doc(
      db,
      "stores",
      store as string,
      "menu",
      origin as string
    );
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
    await deleteDoc(
      doc(db, "stores", store as string, "menu", origin as string)
    );
    if (typeof file != "string") {
      const storageRef = ref(firebaseApp, `menu/${file.name}`);
      uploadBytes(storageRef, file as File).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setDoc(
            doc(db, "stores", store as string, "menu", data.name as string),
            {
              ...data,
              sort: +data.sort,
              price: +data.price,
              src: url,
              soldOut: data.soldOut === "true",
            }
          );
        });
      });
      return Response.json({ success: true });
    } else {
      setDoc(doc(db, "stores", store as string, "menu", data.name as string), {
        ...data,
        sort: +data.sort,
        price: +data.price,
      });
      return Response.json({ success: true });
    }
  }
  return Response.json({ success: true });
}
