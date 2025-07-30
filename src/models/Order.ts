export type Order = {
  id: string;
  employee_id: string;
  status_id: string;

  items: {
    id: string;
    product_variant_id: string;
    quantity: number;
  }[];
};
