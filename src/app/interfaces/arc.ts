import { Image } from "./image";

export interface Arc {
  name: string;
  description: string;
  order: number;
  images: Image[];
}
