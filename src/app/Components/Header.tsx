"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GiDumplingBao } from "react-icons/gi";
import useUserInfo from "../hooks/useUserInfo";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user-atom";

export default function Header() {
  const [token, setToken] = useState<string>("");
  const pathname = usePathname();
  const { replace } = useRouter();
  // const user = useUserInfo();
  const [user, setUser] = useRecoilState(userState);
  const handleLogout = () => {
    replace("/");
    deleteCookie("TOKEN");
    setUser(null);
  };

  useEffect(() => {
    const userToken = getCookie("TOKEN");
    setToken(userToken as string);
    console.log(user, user);
    if (!userToken) {
      replace("/");
      return;
    }
  }, [pathname]);

  return (
    user && (
      <header className="h-12 flex items-center justify-between px-10 border-b-2 border-b-gray-100">
        <div className="flex items-center gap-1 text-2xl font-bold text-blue-700">
          <GiDumplingBao size={30} />
          <span className="">만두 어드민</span>
        </div>
        <ul className="flex space-x-6">
          <li>
            <span className="text-blue-500 font-semibold">{user?.name}</span>님
            반갑습니다.
          </li>
          <li className="cursor-pointer" onClick={handleLogout}>
            로그아웃
          </li>
        </ul>
      </header>
    )
  );
}
