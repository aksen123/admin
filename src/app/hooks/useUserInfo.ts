import { User } from "@/types/service";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { base64DecodeUtf8 } from "../service/base64";

const useUserInfo = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getCookie("TOKEN");
    if (!token) {
      replace("/");
      return;
    }
    setUser(JSON.parse(base64DecodeUtf8(token)));
  }, [pathname]);

  return user;
};

export default useUserInfo;
