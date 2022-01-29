import { Image } from "./image";

export interface Product {
  description: string;
  images: Image[];
  name: string;
  order: number;
  price: number;
  quantity: number;
  sizes: string[];
  size: string;
  stock: { [key: string]: number };
}
