import { injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { Product } from 'prisma/prisma-client';

@injectable()
export class ProductService {
  constructor(private readonly prisma = new PrismaClient()) {}

  async getAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async create(product: Product) {
    return await this.prisma.product.create({
      data: product,
    });
  }

  async update(guid: string, product: Product) {
    return await this.prisma.product
      .update({
        where: {
          guid: guid,
        },
        data: {
          description: product.description || undefined,
          saleValue: product.saleValue || undefined,
          stock: product.stock || undefined,
          // image: product.image,
        },
      })
      .catch((error) => {
        console.log('ERROR - -- - ', error);
      });
  }

  async delete(guid: string) {
    return await this.prisma.product.delete({
      where: {
        guid: guid,
      },
    });
  }
}
