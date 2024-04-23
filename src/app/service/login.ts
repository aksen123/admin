import api from "./axios";
import { Login, User } from "@/types/service";

export const loginApi = {
  login(data: Login): Promise<string> {
    return api.post("/api/login", data);
  },
};
