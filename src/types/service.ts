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
  order: {
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
