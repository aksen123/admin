"use client";

import { useForm } from "react-hook-form";
import { storeApi } from "../service/store";
import { AddStore } from "@/types/service";

export default function page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddStore>({
    mode: "onChange",
    defaultValues: {},
  });
  const onSubmit = async (formData: AddStore) => {
    const koreaRegex = /^[가-힣]+$/;
    let addStore = true;
    if (!koreaRegex.test(formData.name)) {
      setError(
        "name",
        { message: "정확하게 입력해 주세요." },
        { shouldFocus: true }
      );
      addStore = false;
    }
    if (formData.birthDate.length < 6) {
      setError(
        "birthDate",
        { message: "생년월일 6자리를 입력해 주세요" },
        { shouldFocus: true }
      );
      addStore = false;
    }

    if (formData.phone.slice(0, 3) !== "010" || formData.phone.length < 11) {
      setError(
        "phone",
        { message: "핸드폰 번호를 정확히 입력해 주세요" },
        { shouldFocus: true }
      );
      addStore = false;
    }
    addStore ? await storeApi.add(formData) : false;
  };
  return (
    <article className="w-full h-full p-10">
      <form
        className="w-full h-full my-auto mx-auto flex flex-col justify-between gap-3 bg-white rounded-2xl px-8 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-bold text-2xl text-blue-600 mb-5">지점 추가</h2>
        <div className="flex flex-1 gap-5">
          <div className="flex-1 flex-col">
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              성명
            </label>
            <input
              type="text"
              {...register("name", {
                required: true,
                maxLength: {
                  value: 17,
                  message: "17자 이하로 입력 가능합니다.",
                },
                pattern: {
                  value: /^[ㄱ-ㅎㅏ-ㅣ가-힣\s]+$/,
                  message: "한글만 입력 가능합니다",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              placeholder="점주님 성함을 입력해 주세요."
            />
            <p className="text-red-600 font-semibold">{errors.name?.message}</p>
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              생년월일
            </label>
            <input
              type="text"
              placeholder="6자리를 입력해주세요 ex) 990101 "
              {...register("birthDate", {
                required: true,
                pattern: { value: /^[0-9]+$/, message: "숫자만 입력해주세요" },
                maxLength: {
                  value: 6,
                  message: "생년월일 6자리를 입력해주세요",
                },
                minLength: {
                  value: 6,
                  message: "생년월일 6자리를 입력해주세요",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
            />
            <p className="text-red-600 font-semibold">
              {errors.birthDate?.message}
            </p>
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              전화번호
            </label>
            <input
              type="text"
              placeholder="핸드폰 번호를 입력해 주세요."
              {...register("phone", {
                required: true,
                pattern: { value: /^[0-9]+$/, message: "숫자만 입력해 주세요" },
                maxLength: {
                  value: 11,
                  message: "휴대폰 번호 11자리를 입력해 주세요",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
            />
            <p className="text-red-600 font-semibold">
              {errors.phone?.message}
            </p>
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              아이디
            </label>
            <input
              type="text"
              {...register("userId", {
                required: true,
                pattern: {
                  value: /^[a-z][a-z0-9]+$/,
                  message: "아이디의 첫글자는 영문으로 입력해 주세요.",
                },
                maxLength: {
                  value: 12,
                  message: "4~12자 이내로 입력해 주세요.",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              placeholder="4~12자의 영문(소문자),숫자로 입력해주세요"
            />
            <p className="text-red-600 font-semibold">
              {errors.userId?.message}
            </p>
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              비밀번호
            </label>
            <input
              type="password"
              {...register("userPassword", {
                required: true,
                pattern: {
                  value: /^[0]+$/,
                  message: "초기 비밀번호는 0000으로 입력해 주세요.",
                },
                maxLength: {
                  value: 4,
                  message: "초기 비밀번호는 0000으로 입력해 주세요.",
                },
                minLength: {
                  value: 4,
                  message: "초기 비밀번호는 0000으로 입력해 주세요.",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              placeholder="초기 비밀번호는 0000으로 입력해 주세요."
            />
            <p className="text-red-600 font-semibold">
              {errors.userPassword?.message}
            </p>
          </div>
          <div className="flex-1 flex-col">
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              지점 명
            </label>
            <input
              type="text"
              {...register("storeName", {
                required: true,
                pattern: {
                  value: /^[가-힣][가-힣0-9]+$/,
                  message: "한글,숫자만 입력 가능합니다.",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              placeholder="지점명을 입력해 주세요."
            />
            <p className="text-red-600 font-semibold">
              {errors.storeName?.message}
            </p>
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              지점 주소
            </label>
            <input
              type="text"
              {...register("address", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              placeholder="지점 주소를 입력해 주세요."
            />
            <p className="text-red-600 font-semibold">
              {errors.address?.message}
            </p>
            <label className="block mb-2 text-lg font-medium text-gray-900 mt-2">
              사업자 등록번호
            </label>
            <input
              type="text"
              {...register("taxId", {
                required: true,
                pattern: { value: /^[0-9]+$/, message: "숫자만 입력해 주세요" },
                maxLength: { value: 10, message: "10자리를 입력해 주세요" },
                minLength: { value: 10, message: "10자리를 입력해 주세요" },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              placeholder="사업자 등록번호를 입력해 주세요."
            />
            <p className="text-red-600 font-semibold">
              {errors.taxId?.message}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-2xl text-white bg-blue-600 p-2.5 w-1/2 my-0 mx-auto active:bg-blue-800"
        >
          추가하기
        </button>
      </form>
    </article>
  );
}
