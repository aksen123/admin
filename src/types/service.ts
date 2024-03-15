import Calendar from "@/app/Components/Calendar";

export interface Food {
  id: string;
  name: string;
  price: number;
  src: string;
  sort: number;
  count: number;
  soldOut: boolean | string;
  file?: File | any;
}

export interface Orders {
  id?: string;
  date: number;
  order:
    | string
    | {
        name: string;
        price: number;
        count: number;
      }[];
}
export interface Sales {
  date: number;
  orders: Orders[];
  totalPrice: number;
}

export interface Calendars {
  date: number;
  total: number | null;
  format: string;
}
interface MonthInformation {
  total: number;
  salesCount: number;
  orderCount: number;
  prevTotal: number;
}
export interface GetPayment {
  monthInfo: MonthInformation;
  calendars: Calendars[];
}
export interface GetSaleDetail {
  sales: Sales[];
  total: number;
  count: number;
}
export interface Range {
  start: number;
  end: number;
}
