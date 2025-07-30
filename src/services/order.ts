import { config } from '@/config';
import { OrderItem } from '@/models/OrderItem';
import axios from 'axios';

const create = async ({ employee_id, items = [] }: { employee_id: string; items: OrderItem[] }): Promise<void> => {
  await axios.post(`${config.api.store}/employees/${employee_id}/orders`, {
    items,
  });
};

export const order = {
  create,
};
