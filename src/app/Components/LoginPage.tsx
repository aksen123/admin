"use client";

import { Login } from "@/types/service";
import { useForm } from "react-hook-form";
import { GiDumplingBao } from "react-icons/gi";
import { loginApi } from "../service/login";
import { CookieValueTypes, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LoginPage() {
  const { replace } = useRouter();
  const [view, setView] = useState(true);

  const { data } = useSWR("/api/login", () => loginApi.getId());
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Login>({
    mode: "onSubmit",
    defaultValues: { id: "", password: "0000" },
  });
  const [token, setToken] = useState<CookieValueTypes | null>(null);
  const onSubmit = async (form: Login) => {
    const token = await loginApi.login(form);
    if (token) {
      setCookie("TOKEN", token);
      replace("/dashboard");
    }
  };
  useEffect(() => {
    const token = getCookie("TOKEN");
    token && setToken(token);
    token && replace("/dashboard");
  }, []);

  const clickList = (str: string) => {
    setValue("id", str);
    setView(false);
  };
  if (token) {
    return null;
  }
  return (
    <div className="w-full h-screen flex justify-center items-center translate-x-[100px]">
      <div className="w-80">
        <div className="flex items-center justify-center gap-1 text-3xl font-semibold text-blue-700 mb-9">
          <GiDumplingBao size={40} />
          <span className="text-black">만두집 어드민</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            {...register("id", {
              required: "아이디를 입력해 주세요.",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "영문,숫자만 입력 가능합니다",
              },
            })}
            onFocus={() => {
              setView(true);
            }}
            onBlur={() => {
              setView(false);
            }}
            autoComplete="off"
            type="text"
            placeholder="아이디"
            className="border-[1px] border-gray-400 outline-2 hover:border-blue-300 focus:outline-blue-400 rounded-xl p-2 px-3 font-thin text-base placeholder:text-base"
          />
          {view && (
            <ul className="absolute top-1/2 bg-gray-800 text-white mt-1 rounded shadow-lg w-32 space-y-1">
              {data?.map((el, i) => {
                return (
                  <li
                    key={i}
                    className="cursor-pointer px-2 hover:bg-slate-400 flex justify-start items-center gap-4"
                    onMouseDown={() => {
                      clickList(el.id);
                    }}
                  >
                    <span>{el.id} : </span>
                    <span>{el.auth}</span>
                  </li>
                );
              })}
            </ul>
          )}
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
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-500 text-white text-center text-lg font-medium rounded-xl p-2 mt-2"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
