'use client';

import { Change } from '@/models/Change';
import { Employee } from '@/models/Employee';
import { OrderItem } from '@/models/OrderItem';
import { services } from '@/services';
import { CartTemplate } from '@/templates/CartTemplate/CartTemplate';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const params = useParams();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [changes, setChanges] = useState<Change[]>([]);
  const [orderItem, setOrderItem] = useState<OrderItem[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const findEmployee = useCallback(async () => {
    const employee_id = String(params.id);
    if (!employee_id) return;
    const response = await services.employees.find({ id: employee_id });
    setEmployee(response);
  }, [params]);

  const getChanges = useCallback(async () => {
    setisLoading(true);

    try {
      const employee_id = String(params.id);
      if (!employee_id) return;

      const response = await services.changesAvaiables.paginate({ employee_id });

      setChanges(response);

      const initialSelected: OrderItem[] = response.map((item: Change) => ({
        id: item.default_variant_id ? String(item.default_variant_id) : '',
        product_variant_id: String(item.default_variant_id),
        order_item_type_id: '2',
        quantity: item.avaiable_quantity ?? 1,
        price: 0,
      }));

      setOrderItem(initialSelected);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario no encontrado',
      });
    }

    setisLoading(false);
  }, [params]);

  const handleVariantChange = (index: number, variant_id: string) => {
    setOrderItem((prev) => prev.map((v, i) => (i === index ? { ...v, product_variant_id: variant_id } : v)));
  };

  const order = async () => {
    const employee_id = String(params.id);
    if (!employee_id) return;

    const result = await Swal.fire({
      icon: 'question',
      title: 'Verificar',
      text: '¿Seguro que deseas solicitar el cambio?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      try {
        await services.order.create({
          employee_id,
          items: orderItem,
        });

        Swal.fire({
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Tu solicitud ha sido enviada',
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Tu solicitud no pudo ser completada',
        });
      }
    }

    await getChanges();
  };

  useEffect(() => {
    getChanges();
    findEmployee();
  }, [getChanges, findEmployee]);

  return (
    <CartTemplate
      navbar={{
        user: {
          name: employee?.name ?? '',
          image_url: employee?.image_url ?? 'https://static.thenounproject.com/png/5100711-200.png',
        },
      }}
      items={changes.map((item, index) => ({
        key: item.id,
        title: item.name,
        description: item.description,
        quantity: item.avaiable_quantity,
        image_url: item.images[0]?.url ?? null,
        select: {
          value: orderItem[index]?.product_variant_id ?? '',
          options: item.variants.map((variant) => ({
            key: String(variant.id),
            id: String(variant.id),
            name: `Talla ${variant.size}`,
          })),
          onChange: (variant_id: string) => handleVariantChange(index, variant_id),
        },
      }))}
      button={{
        content: 'Solicitar cambio',
        onClick: () => order(),
      }}
      spinner={{
        isLoading: isLoading,
        text: 'Cargando productos...',
      }}
      fallback={{
        content: 'No hay productos por mostrar',
      }}
    />
  );
}
