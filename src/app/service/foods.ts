import api from "./axios";
import { Food } from "@/types/service";
export const foodsService = {
  get(): Promise<Food[]> {
    return api.get("/api/menu");
  },
  add(food: Food) {
    return api.post("/api/menu", {
      ...food,
    });
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
