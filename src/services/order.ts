import { orderAdapter } from '@/adapters/order-adapter';
import { config } from '@/config';
import { Order } from '@/models/Order';
import { OrderItem } from '@/models/OrderItem';
import axios from 'axios';

const paginate = async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}): Promise<Order[]> => {
  const response = await axios.get(`${config.api.store}/orders`, {
    params: {
      page,
      limit,
    },
  });

  console.log(response.data.data.orders);

  if (response?.data?.data?.orders) return response.data.data.orders.map((item: any) => orderAdapter(item));
  throw new Error('');
};

const show = async ({ id }: { id: string }): Promise<Order> => {
  const response = await axios.get(`${config.api.store}/orders/${id}`, {});

  if (response?.data?.data) return orderAdapter(response.data);
  throw new Error('');
};

const create = async ({ employee_id, items = [] }: { employee_id: string; items: OrderItem[] }): Promise<void> => {
  await axios.post(`${config.api.store}/employees/${employee_id}/orders`, {
    items,
  });
};

const finish = async ({ id }: { id: string }): Promise<void> => {
  const response = await axios.post(`${config.api.store}/orders/${id}/finish`);
};

export const order = {
  create,
  paginate,
  show,
  finish,
};
