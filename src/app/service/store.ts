import api from "./axios";
import { AddStore, StoreInfo } from "@/types/service";

export const storeApi = {
  list(): Promise<StoreInfo[]> {
    return api.get("/api/store");
  },
  add(data: AddStore): Promise<Response> {
    return api.post("/api/store", data);
  },
};
