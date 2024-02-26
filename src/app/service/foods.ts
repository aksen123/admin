import api, { apiFile } from "./axios";
import { Food } from "@/types/service";
export const foodsService = {
  get(): Promise<Food[]> {
    return api.get("/api/menu");
  },
  add(formData: FormData) {
    return apiFile.post("/api/menu", formData);
  },
  update(formData: FormData) {
    return apiFile.put("/api/menu", formData);
  },
  delete(id: string) {
    return api.delete(`/api/menu/${id}`);
  },
  sort(obj: any) {
    return apiFile.post("/api/sort", obj);
  },
};
