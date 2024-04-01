export interface Food {
  id: string;
  name: string;
  price: number;
  src: string;
  sort: number;
  count: number;
  soldOut: boolean;
  file?: File | any;
}

export interface Menu {
  name: string;
  price: number;
  count: number;
}

export interface Sales {
  id?: string;
  date: number;
  order: Menu[];
  total: number;
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

export interface StoreStatus {
  count: number;
  total: number;
}
