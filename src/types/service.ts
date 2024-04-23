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
  store: string;
  total: number;
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
  store: number;
  name: string;
  phone: string;
  birthDate: string;
}
