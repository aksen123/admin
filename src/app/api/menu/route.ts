import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
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
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => !el.includes("file"))
  );
  const file = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => el[0] === "file")
  ).file as File;

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
  const storageRef = ref(firebaseApp, `menu/${file.name}`);
  uploadBytes(storageRef, file as File).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      setDoc(doc(db, "foods", data.name as string), {
        ...data,
        price: +data.price,
        soldOut: false,
        src: url,
      });
    });
  });
  return Response.json({ success: true });
}
