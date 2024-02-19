import axios from "axios";
import api, { apiFile } from "./axios";
import { Food } from "@/types/service";
export const foodsService = {
  get(): Promise<Food[]> {
    return api.get("/api/menu");
  },
  add(formData: FormData) {
    return apiFile.post("/api/menu", formData);
  },
  update(food: Food) {
    return api.post("/api/menu", {
      ...food,
    });
  },
  delete(id: string) {
    return api.delete(`/api/menu/${id}`);
  },
};
