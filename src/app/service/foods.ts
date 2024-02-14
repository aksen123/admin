import api from "./axios";
import { Food } from "@/types/service";
export const foodsService = {
  get(): Promise<Food[]> {
    return api.get("/api/menu");
  },
};
