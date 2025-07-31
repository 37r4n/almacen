export type Order = {
  id: string;
  employee_id: string;
  status_id: string;

  items: {
    id: string;
    product_variant_id: string;
    quantity: number;

    product?: {
      id: string;
      name: string;
      description: string;
      image_url: string;

      variant: {
        id: string;
        atrtibut_id: string;
        value: string;
      };
    };
  }[];

  employee?: {
    department: string;
    id: string;
    image_url: string;
    name: string;
  };

  status?: {
    id: string;
    name: string;
  };
};
