import api, { apiFile } from "./axios";
import { Food } from "@/types/service";

export const foodsService = {
  get(store: string | null): Promise<Food[]> {
    return api.get("/api/menu", { params: { store } });
  },
  add(formData: FormData, store: string | null) {
    return apiFile.post("/api/menu", formData, { params: { store } });
  },
  update(formData: FormData, store: string | null) {
    return apiFile.put("/api/menu", formData, { params: { store } });
  },
  delete(id: string, store: string | null) {
    return api.delete(`/api/menu/${id}`, { params: { store } });
  },
  sort(foods: Food[], store: string | null) {
    return api.post("/api/sort", { foods, store });
  },
};
