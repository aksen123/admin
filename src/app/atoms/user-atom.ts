import { User } from "@/types/service";
import { getCookie } from "cookies-next";
import { atom } from "recoil";
import { base64DecodeUtf8 } from "../service/base64";

const token = getCookie("TOKEN");
const data: User | null = token ? JSON.parse(base64DecodeUtf8(token)) : null;

export const userState = atom({
  key: "userState",
  default: data,
});
