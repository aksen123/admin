import { StoreStatus, BoardStatus, PostPayment } from "@/types/service";
import api from "./axios";

export const getOrder = {
  get(store: string): Promise<StoreStatus> {
    return api.get(`/api/order/${store}`);
  },
  getStore(store: string, date: string): Promise<BoardStatus> {
    return api.get(`/api/order/date/${date}`, { params: { store } });
  },
  post(data: PostPayment) {
    return api.post("/api/order", data);
  },
};
