import { GetPayment, Range, Sales, GetSaleDetail } from "@/types/service";
import api from "./axios";

export const saleService = {
  getSales(range: Range): Promise<GetPayment> {
    return api.get("/api/sales", { params: { ...range } });
  },
  getSalesDetail(range: Range): Promise<GetSaleDetail> {
    return api.get("/api/sales/detail", { params: { ...range } });
  },
};
