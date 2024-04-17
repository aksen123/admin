import api from "./axios";
import { Login, User } from "@/types/service";

export const loginApi = {
  login(data: Login): Promise<User> {
    return api.post("/api/login", data);
  },
};
