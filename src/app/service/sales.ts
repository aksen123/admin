import { Sales } from "@/types/service";
import api from "./axios";

export const saleService = {
  get(range: object): Promise<Sales[]> {
    return api.get("/api/sales", { params: { ...range } });
  },
};
