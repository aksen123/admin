"use client";
import { Login } from "@/types/service";
import { useForm } from "react-hook-form";
import { GiDumplingBao } from "react-icons/gi";
import { loginApi } from "../service/login";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/user-atom";
import { base64DecodeUtf8 } from "../service/base64";

export default function LoginPage() {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: "onSubmit",
    defaultValues: { id: "test1", password: "0000" },
  });

  const setUser = useSetRecoilState(userState);
  const onSubmit = async (form: Login) => {
    const token = await loginApi.login(form);
    if (token) {
      setCookie("TOKEN", token);
      setUser(JSON.parse(base64DecodeUtf8(token)));
      replace("/dashboard");
    }
  };

  useEffect(() => {
    const token = getCookie("TOKEN");
    console.log(token, "로그인페이지");
    token && replace("/dashboard");
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center translate-x-[100px]">
      <div className="w-80">
        <div className="flex items-center justify-center gap-1 text-3xl font-semibold text-blue-700 mb-9">
          <GiDumplingBao size={40} />
          <span className="text-black">만두어드민</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            {...register("id", { required: "아이디를 입력해 주세요." })}
            type="text"
            placeholder="아이디"
            className="border-[1px] border-gray-400 outline-2 hover:border-blue-300 focus:outline-blue-400 rounded-xl p-2 px-3 font-thin text-base placeholder:text-base"
          />
          <p className="text-red-600">{errors.id?.message}</p>
          <input
            {...register("password", { required: "비밀번호를 입력해 주세요." })}
            type="password"
            placeholder="비밀번호"
            className="border-[1px] border-gray-400 outline-2 hover:border-blue-300 focus:outline-blue-400 rounded-xl p-2 px-3 font-thin text-base placeholder:text-base"
          />
          <p className="text-red-600">{errors.password?.message}</p>
          <button
            type="submit"
            className="bg-blue-600 text-white text-center text-lg font-medium rounded-xl p-2 mt-2"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
