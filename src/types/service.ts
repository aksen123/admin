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
