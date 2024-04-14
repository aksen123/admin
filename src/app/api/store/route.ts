import db from "@/app/service/firebase";
import { collection, getDocs } from "firebase/firestore";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { AddStore } from "@/types/service";
import { storeApi } from "@/app/service/store";
export async function GET() {
  const storeCollection = await getDocs(collection(db, "stores"));
  const stores = storeCollection.docs.map((doc) => {
    return { code: doc.id, name: doc.get("name") };
  });
  console.log("stores ::: ", stores);
  return Response.json({ success: true, data: stores });
}

/**
 * 1. 비밀번호 암호화하기
 * 2. 지점 코드 조회후 제일큰 숫자 +1 을 지점 코드, 문서명으로 저장해주기
 * 3. stores에 지점명,주소,사업자번호, 지점코드, 이름,전화번호 넣어주기
 * 4. users에 이름, 생년월일, 비번, 지점코드, 권한 넣어주기
 * 5. menu에 default-menu에있는 메뉴들 지점코드_메뉴코드로 넣어주기 필드값에 store 추가해서 지점코드 넣기
 *
 */
export async function POST(request: NextRequest) {
  const formData: AddStore = await request.json();
  const stores = await storeApi.list();
  console.log("post api!!!!!", formData);
  if (stores.find((el) => el.name == formData.storeName)) {
    return Response.json(
      {
        success: false,
        error: { message: "같은 이름의 지점이 있습니다." },
      },
      { status: 500 }
    );
  } else {
    const newCode = Math.max(...stores.map((el) => +el.code)) + 1;
    const password = crypto
      .createHash("sha256")
      .update(formData.userPassword)
      .digest("hex");

    console.log(password, formData);
    console.log(stores, newCode);
  }
  return Response.json({ success: true });
}
