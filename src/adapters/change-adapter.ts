import { Change } from '@/models/Change';

export const changeAdapter = (data: any): Change => ({
  id: String(data.id),
  name: String(data.name),
  avaiable_quantity: Number(data.avaiable_quantity),
  description: data.description ?? null,
  default_variant_id: data.default_variant_id,

  images: Array.isArray(data.images)
    ? data.images.map((img: any) => ({
        id: String(img.id),
        url: String(img.url),
      }))
    : [],

  variants: Array.isArray(data.variants)
    ? data.variants.map((variant: any) => ({
        id: String(variant.id),
        price: Number(variant.price),
        stock: Number(variant.stock),
        size:
          Array.isArray(variant.attributes) && variant.attributes.length > 0
            ? String(variant.attributes[0].value)
            : null,
      }))
    : [],
});
