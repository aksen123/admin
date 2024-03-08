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

interface Orders {
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
export interface GetPayment {
  totalPrice: number;
  totalSalesCount: number;
  calendars: Calendars[];
}

export interface Range {
  start: number;
  end: number;
}
