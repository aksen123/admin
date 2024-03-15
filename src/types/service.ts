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

export interface Orders extends Order {
  id?: string;
}

export interface Order {
  date: number;
  order: string;
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
