'use client';

import { Order } from '@/models/Order';
import { services } from '@/services';
import { StoreTemplate } from '@/templates/StoreTemplate/StoreTemplate';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const [order, setOrder] = useState<Order | null>(null);
  const params = useParams();

  const getItems = async () => {
    const id = String(params.id);
    const response = await services.order.show({ id: id });
    setOrder(response);
  };

  useEffect(() => {
    getItems();
  }, [params]);

  const signature = async () => {
    Swal.fire({
      icon: 'info',
      title: 'Verificación',
      text: 'Por favor verifique con huella',
      showConfirmButton: false,
    });

    const response = await services.signature.verify({ employee_id: order?.employee_id ?? '' });

    if (response) {
      await services.order.finish({ id: order?.id ?? '' });

      Swal.fire({
        icon: 'success',
        title: 'Orden firmada',
        text: 'La órden ha sido firmada correctamente',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Firma inválida',
        text: 'Usuario incorrecto',
      });
    }
  };

  return (
    <StoreTemplate
      items={(order?.items ?? []).map((item) => ({
        key: item.id,
        name: item.product?.name ?? 'Sin nombre',
        description: `Cantidad ${item.quantity} - Talla ${item.product?.variant?.value ?? 'N/A'}`,
        image_url: item.product?.image_url ?? 'https://via.placeholder.com/150',
      }))}
      createButton={{
        content: 'Entregar',
        onClick: () => signature(),
      }}
    />
  );
}
