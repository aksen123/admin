import { useEffect, useState } from "react";
import Modal from "../Modal";
import { foodsService } from "@/app/service/foods";
import { useForm } from "react-hook-form";
import { Food } from "@/types/service";
import { mutate } from "swr";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "@/app/service/firebase";
import Image from "next/image";
import axios from "axios";
import { url } from "inspector";

export default function AddFoodPopup({ onClose }: { onClose: () => void }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const {
    register,
    setFocus,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Food>({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = async (food: Food) => {
    const formData = new FormData();
    formData.append("file", food.file ? food.file[0] : "");
    formData.append("name", food.name);
    formData.append("price", food.price + "");

    if (imageUrl !== null) {
      foodsService
        .add(formData)
        .then(() => {
          alert(`${food.name} 음식이 등록되었습니다.`);
          URL.revokeObjectURL(imageUrl);
          mutate("/api/menu");
          onClose();
        })
        .catch((err) => {
          console.log("err>>>>>>>>>>>>>>>>>", err);
        });
    }
  };

  useEffect(() => {
    setFocus("name");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      const maxSize = 5 * 1024 * 1024;
      if (selectedImage.size > maxSize) {
        alert("이미지 크기가 너무 큽니다. 5MB 이하의 이미지를 선택해주세요.");
        setImageUrl(null);
        e.target.value = "";
      } else {
        const url = URL.createObjectURL(selectedImage);
        setImageUrl(url);
      }
    } else {
      setImageUrl(null);
    }
  };

  return (
    <Modal open={true}>
      <form
        className="w-80 min-h-[10rem] bg-white rounded-3xl p-3 flex flex-col justify-around"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-semibold text-xl">음식추가</h3>
        <div className="py-4 space-y-2">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              이름
            </label>
            <input
              {...register("name", {
                required: "이름을 입력해 주세요.",
                onChange(e) {
                  // TODO: regex 한글 판단 e.target.value
                  setValue("name", String(e.target.value).replaceAll(" ", ""));
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="이름입력"
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              가격
            </label>
            <input
              {...register("price", {
                required: true,
                onChange(e: React.ChangeEvent<HTMLInputElement>) {
                  setValue(
                    "price",
                    +String(e.target.value).replaceAll(/\D/g, "")
                  );
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="가격입력"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              메뉴 이미지
            </label>
            {imageUrl && (
              <Image width={100} height={100} src={imageUrl} alt="메뉴이미지" />
            )}
            <input
              {...register("file", {
                onChange(e: React.ChangeEvent<HTMLInputElement>) {
                  handleChange(e);
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="grow p-2 rounded-2xl bg-gray-300"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="submit"
            className="grow p-2 rounded-2xl text-white bg-blue-500"
          >
            추가
          </button>
        </div>
      </form>
    </Modal>
  );
}
