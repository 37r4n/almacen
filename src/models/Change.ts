export type Change = {
  id: string;
  name: string;
  avaiable_quantity: number;
  description: string | null;
  default_variant_id: string;

  images: {
    id: string;
    url: string;
  }[];

  variants: {
    id: string;
    price: number;
    stock: number;
    size: string;
  }[];
};
