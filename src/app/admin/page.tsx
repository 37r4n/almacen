'use client';

import { Product } from '@/models/Product';
import { services } from '@/services';
import { StoreTemplate } from '@/templates/StoreTemplate/StoreTemplate';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const response = await services.products.paginate({ limit: 100 });
    setProducts(response);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const sendNewProduct = async (data: any) => {
    Swal.fire({
      title: 'Creando',
      text: 'Creando nuevo producto',
    });

    const product = {
      name: data.name,
      description: data.description,
      categories: [{ id: parseInt(data.type) }],

      rules: [
        { id: 1, value: `${data.maxChanges}-${data.cycleDays}` },
        { id: 2, value: data.departments },
      ],

      images: [{ url: data.image }],

      variants: [
        {
          price: data.price,
          stock: 0,
          attributes: [{ id: 2, value: 'S' }],
          images: [],
        },

        {
          price: data.price,
          stock: 0,
          attributes: [{ id: 2, value: 'S' }],
          images: [],
        },

        {
          price: data.price,
          stock: 0,
          attributes: [{ id: 2, value: 'M' }],
          images: [],
        },

        {
          price: data.price,
          stock: 0,
          attributes: [{ id: 2, value: 'L' }],
          images: [],
        },

        {
          price: data.price,
          stock: 0,
          attributes: [{ id: 2, value: 'XL' }],
          images: [],
        },
      ],
    };

    await services.products.create(product);

    getProducts();

    Swal.fire({
      icon: 'success',
      title: 'Producto creado',
      text: 'Producto creado correctamente',
    });
  };

  const createNewProduct = () => {
    Swal.fire({
      title: 'Crear nuevo producto',
      html: `
      <div class="sw-from">
        <input id="product-name" placeholder="Nombre" />
        <input id="product-description" placeholder="Descripción" />

        <div class="sw-row">
          <input type="number" id="product-max-changes" placeholder="Máximo de cambios" />
          <input type="number" id="product-cycle-days" placeholder="Ciclo de cambios en días" />
        </div>

        <input id="product-departments" placeholder="Departamentos" />
        <input id="product-image" placeholder="URL de la imágen" />


        <div class="sw-row">
          <input type="number" id="product-price" placeholder="Precio" />

          <select id="product-type"  style="margin-top: 10px;">
            <option value="">Selecciona tipo de prenda</option>
            <option value="2">Playera</option>
            <option value="3">Pantalón</option>
          </select>
        </div>
      </div>
    `,
      confirmButtonText: 'Guardar',

      preConfirm: () => {
        const name = (document.getElementById('product-name') as HTMLInputElement)?.value;
        const description = (document.getElementById('product-description') as HTMLInputElement)?.value;
        const maxChanges = parseInt((document.getElementById('product-max-changes') as HTMLInputElement)?.value);
        const cycleDays = parseInt((document.getElementById('product-cycle-days') as HTMLInputElement)?.value);
        const departments = (document.getElementById('product-departments') as HTMLInputElement)?.value;
        const image = (document.getElementById('product-image') as HTMLInputElement)?.value;
        const price = parseFloat((document.getElementById('product-price') as HTMLInputElement)?.value);
        const type = (document.getElementById('product-type') as HTMLSelectElement)?.value;

        if (
          !name ||
          !description ||
          isNaN(maxChanges) ||
          isNaN(cycleDays) ||
          !departments ||
          !image ||
          isNaN(price) ||
          !type
        ) {
          Swal.showValidationMessage('Por favor completa todos los campos correctamente.');
          return false;
        }

        // ✅ Retornar todos los datos
        return { name, description, maxChanges, cycleDays, departments, image, price, type };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        sendNewProduct(result.value);
      }
    });
  };

  return (
    <StoreTemplate
      items={products.map((product) => ({
        key: product.id,
        name: product.name,
        description: product.description,
        image_url: product.images[0]?.url ?? '',
      }))}
      createButton={{
        onClick: createNewProduct,
        content: 'Agregar nuevo producto',
      }}
    />
  );
}
