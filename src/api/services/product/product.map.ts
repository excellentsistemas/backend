import { Product, ProductImage } from '@prisma/client';

export interface ViewProduct {
  guid: string;
  description: string;
  saleValue: number;
  stock: number;
  images: any[];
}

export interface ViewProductImage {
  guid?: string;
  productGuid?: string;
  name: string;
  mimeType: string;
  image: Buffer;
}

// Mappers

export const MapProduct = (
  data: Product & { productImages?: ProductImage[] }
): ViewProduct => {
  return {
    description: data.description,
    guid: data.guid,
    saleValue: data.saleValue,
    stock: data.stock,
    images: data.productImages!,
  };
};

export const MapProductImage = (
  data: ProductImage & { product: Product }
): Partial<ViewProductImage> => {
  return {
    // image: data.image,
    mimeType: data.mimeType,
    name: data.name,
    guid: data.guid,
    productGuid: data.product.guid,
  };
};
