import { StoreStatus, BoardStatus, PostPayment } from "@/types/service";
import api from "./axios";

export const getOrder = {
  get(store: string): Promise<StoreStatus> {
    return api.get(`/api/order/${store}`);
  },
  getStore(store: string): Promise<BoardStatus> {
    return api.get("/api/order", { params: { store } });
  },
  post(data: PostPayment) {
    return api.post("/api/order", data);
  },
};
