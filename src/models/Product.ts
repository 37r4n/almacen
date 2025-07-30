export type Product = {
  id: string;
  name: string;
  description: string;

  images: {
    id: string;
    url: string;
  }[];
};
