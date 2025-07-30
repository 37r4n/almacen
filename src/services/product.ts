import { productAdapter } from '@/adapters/product_adapter';
import { config } from '@/config';
import { Product } from '@/models/Product';
import axios from 'axios';

const paginate = async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}): Promise<Product[]> => {
  const response = await axios.get(`${config.api.store}/products`, {
    params: {
      page,
      limit,
    },
  });

  if (response?.data?.data) return response.data.data.map((item: any) => productAdapter(item));
  throw new Error('');
};

const create = async ({ name, description, categories = [], rules = [], images = [], variants = [] }: any) => {
  const response = await axios.post(`${config.api.store}/products`, {
    name,
    description,
    categories,
    rules,
    images,
    variants,
  });

  console.log(response);
};

export const products = {
  paginate,
  create,
};
