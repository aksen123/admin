import { Menu, StoreStatus } from "@/types/service";
import api from "./axios";

interface GetOrders extends Menu {
  id: string;
}
export const getOrder = {
  list(): Promise<Menu[]> {
    return api.get("/api/order");
  },
  get(store: string): Promise<StoreStatus> {
    return api.get(`/api/order/${store}`);
  },
  test() {
    return api.get("/api/test/test222");
  },
};
