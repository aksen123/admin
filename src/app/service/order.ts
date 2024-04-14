import { Menu, StoreStatus } from "@/types/service";
import api from "./axios";

interface GetOrders extends Menu {
  id: string;
}
export const getOrder = {
  get(store: string): Promise<StoreStatus> {
    return api.get(`/api/order/${store}`);
  },
};
