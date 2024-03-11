import { injectable } from 'inversify';
import { PrismaClient, Product, ProductImage } from '@prisma/client';
import {
  MapProduct,
  MapProductImage,
  ViewProduct,
  ViewProductImage,
} from './product.map';

@injectable()
export class ProductService {
  constructor(private readonly prisma = new PrismaClient()) {}

  async getAll(): Promise<ViewProduct[]> {
    const data = await this.prisma.product.findMany({
      where: {
        active: true,
      },
    });
    return data.map((value) => MapProduct(value));
  }

  async getByGuid(guid: string): Promise<ViewProduct> {
    const data = await this.prisma.product.findFirst({
      where: {
        guid: guid,
        active: true,
      },
      include: {
        productImages: true,
      },
    });

    if (!data) {
      throw {
        message: `Produto ${guid} não encontrado!`,
      };
    }

    return MapProduct(data);
  }

  async create(product: ViewProduct): Promise<ViewProduct> {
    const data = await this.prisma.product.create({
      data: product,
    });
    return MapProduct(data);
  }

  async update(guid: string, product: ViewProduct): Promise<ViewProduct> {
    const data = await this.prisma.product.update({
      where: {
        guid: guid,
      },
      data: {
        description: product.description || undefined,
        saleValue: product.saleValue || undefined,
        stock: product.stock || undefined,
        // image: product.image,
      },
    });
    return MapProduct(data);
  }

  async delete(guid: string): Promise<ViewProduct> {
    const data = await this.prisma.product.update({
      where: {
        guid: guid,
      },
      data: {
        active: false,
      },
    });
    return MapProduct(data);
  }

  async uploadImage(
    productGuid: string,
    productImage: ViewProductImage
  ): Promise<Partial<ViewProductImage>> {
    const product = await this.prisma.product.findFirst({
      where: {
        guid: productGuid,
      },
    });

    if (!product) {
      throw {
        message: `Produto ${productGuid} não encontrado`,
      };
    }

    const data = await this.prisma.productImage.create({
      data: {
        productId: product.id,
        image: Buffer.from(productImage.image.buffer),
        mimeType: productImage.mimeType,
        name: productImage.name,
      },
      include: {
        product: true,
      },
    });

    return MapProductImage(data);
  }

  async downloadImage(
    imageGuid: string
  ): Promise<ProductImage & { product: Product }> {
    const image = await this.prisma.productImage.findUnique({
      where: { guid: imageGuid },
      include: {
        product: true,
      },
    });

    if (!image) {
      throw {
        message: `Imagem ${imageGuid} não encontrada.`,
      };
    }

    return image;
  }
}
