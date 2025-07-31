'use client';

import { Order } from '@/models/Order';
import { services } from '@/services';
import { OrderTemplate } from '@/templates/OrderTemplate/OrderTemplate';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    const response = await services.order.paginate();
    setOrders(response);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <OrderTemplate
      items={orders.map((order) => ({
        key: order.id,
        avatar: order.employee?.image_url ?? '',
        status: order.status?.name ?? '',
        name: order.employee?.name ?? '',
        department: order.employee?.department ?? '',
        onClick: () => router.push(`/admin/ordenes/${order.id}`),
      }))}
    />
  );
}
