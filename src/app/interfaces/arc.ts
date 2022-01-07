import { Image } from "./image";

export interface Arc {
  name: string;
  description: string;
  order: number;
  date: Date;
  images: Image[];
  background: string;
}
