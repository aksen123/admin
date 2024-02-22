export interface Food {
  id: string;
  name: string;
  price: number;
  src: string;
  number: number;
  count: number;
  soldOut: boolean | string;
  file?: File | any;
}
