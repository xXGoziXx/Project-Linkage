import { Image } from './image';

export interface Product {
  description: string;
  images: Image[];
  name: string;
  order: number;
  price: number;
  sizes: string[];
}
