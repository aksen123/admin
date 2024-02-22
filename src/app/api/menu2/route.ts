import { NextRequest } from "next/server";
import { Food } from "@/types/service";
import db, { firebaseApp } from "@/app/service/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

interface DataType {
  [k: string]: FormDataEntryValue;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const data: DataType = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => !el.includes("file"))
  );
  const file = Object.fromEntries(
    Array.from(formData.entries()).filter((el) => el[0] === "file")
  ).file as File;

  console.log("api:::::::", data.name, file.name);
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
