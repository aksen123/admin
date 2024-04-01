import { GetPayment, Range, Sales, GetSaleDetail } from "@/types/service";
import api from "./axios";

export const saleService = {
  getSales(range: Range, store: string | null): Promise<GetPayment> {
    return api.get("/api/sales", { params: { ...range, store } });
  },
  getSalesDetail(range: Range, store: string | null): Promise<GetSaleDetail> {
    return api.get("/api/sales/detail", { params: { ...range, store } });
  },
};
