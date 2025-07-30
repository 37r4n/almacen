import { Product } from '@/models/Product';

export const productAdapter = (data: any): Product => ({
  id: String(data.id),
  name: String(data.name),
  description: String(data.description),

  images: Array.isArray(data.images)
    ? data.images.map((img: any) => ({
        id: String(img.id),
        url: String(img.url),
      }))
    : [], // fallback si no hay imágenes
});
