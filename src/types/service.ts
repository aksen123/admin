export interface Food {
  id: string;
  unique: string;
  name: string;
  price: number;
  src: string;
  sort: number;
  count: number;
  soldOut: boolean;
  hide: boolean;
  file?: File | string;
}

export interface Menu {
  name: string;
  price: number;
  count: number;
}

export interface Sales {
  id: string;
  date: number;
  order: Menu[];
  store: string;
  total: number;
  receipt: boolean;
  complete: boolean;
  orderType: boolean;
}

export interface Calendars {
  date: number;
  total: number | null;
  format: string;
}
export interface MonthInformation {
  total: number;
  prevTotal: number;
  percentage: number | string;
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
export interface BoardStatus extends StoreStatus {
  wait: Sales[];
  receipt: Sales[];
  complete: Sales[];
}
export interface StoreInfo {
  code: string;
  name: string;
}

export interface AddStore {
  storeName: string;
  address: string;
  taxId: string;
  name: string;
  birthDate: string;
  phone: string;
  userId: string;
  userPassword: string;
}

export interface Login {
  id: string;
  password: string;
}

export interface User {
  id: string;
  userId: string;
  auth: string[];
  userPassword: string;
  store: string;
  name: string;
  phone: string;
  birthDate: string;
}

export interface PostPayment {
  id: string;
  view: string;
}
