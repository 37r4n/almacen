import { Order } from '@/models/Order';

export const orderAdapter = (data: any): Order => {
  // Si `data` tiene la estructura plana, no tiene `data.data` ni `order`
  // Así que adaptamos para ambos casos

  // Si recibes un objeto envuelto
  const source = data.data ? data.data : data;

  const order = source.order ?? source;  // si no hay .order, el mismo objeto
  const items = source.items ?? [];

  return {
    id: String(order.id),
    employee_id: String(order.employee_id),
    status_id: String(order.status_id),

    items: Array.isArray(items)
      ? items.map((item: any) => ({
          id: String(item.id),
          product_variant_id: String(item.product_variant_id),
          quantity: Number(item.quantity),

          product: item.product
            ? {
                id: String(item.product.id),
                name: String(item.product.name),
                description: String(item.product.description),
                image_url: item.product.images?.[0]?.url ?? '',
                variant: item.product.variant?.[0]
                  ? {
                      id: String(item.product.variant[0].id),
                      atrtibut_id: String(item.product.variant[0].attribute_id),
                      value: String(item.product.variant[0].value),
                    }
                  : {
                      id: '',
                      atrtibut_id: '',
                      value: '',
                    },
              }
            : undefined,
        }))
      : [],

    employee: order.employee
      ? {
          department: String(order.employee.department),
          id: String(order.employee.id),
          image_url: String(order.employee.image_url ?? ''),
          name: String(order.employee.name),
        }
      : undefined,

    status: order.status
      ? {
          id: String(order.status.id),
          name: String(order.status.name),
        }
      : undefined,
  };
};
