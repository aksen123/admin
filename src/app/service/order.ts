import { Orders } from "@/types/service";
import api from "./axios";

interface GetOrders extends Orders {
  id: string;
}
export const getOrder = {
  list(): Promise<Orders[]> {
    return api.get("/api/order");
  },
  get(index: number): Promise<Orders> {
    return api.get(`/api/order/${index}`);
  },
};
