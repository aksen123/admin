import api from "./axios";
import { Food } from "@/types/service";
export const defaultApi = {
  list(): Promise<Food[]> {
    return api.get("/api/default-menu");
  },
};
