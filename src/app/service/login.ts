import api from "./axios";
import { Login } from "@/types/service";

export const loginApi = {
  login(data: Login): Promise<string> {
    return api.post("/api/login", data);
  },
};
