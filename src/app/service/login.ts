import api from "./axios";
import { Login } from "@/types/service";

interface UserData {
  id: string;
  auth: string;
}

export const loginApi = {
  login(data: Login): Promise<string> {
    return api.post("/api/login", data);
  },
  getId(): Promise<UserData[]> {
    return api.get("/api/login");
  },
};
