import api from "./axios";
import { Orders } from "@/types/service";

interface GetOrders extends Orders {
  id: string;
}
export const getOrder = {
  list(): Promise<Orders[]> {
    return api.get("/api/order");
  },
};
