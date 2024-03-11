import { injectable } from 'inversify';
import { Demand, PrismaClient } from '@prisma/client';

@injectable()
export class DemandService {
  constructor(private readonly prisma = new PrismaClient()) {}

  async getAll() {
    const demands = await this.prisma.demand.findMany({
      include: {
        demandProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return demands;
  }

  async create(data: {
    products: Array<{ productGuid: string; amount: number }>;
  }) {
    const demand = await this.prisma.demand.create({
      data: {},
    });

    for (const value of data.products) {
      const product = await this.prisma.product.findUnique({
        where: {
          guid: value.productGuid,
        },
      });

      if (!product) {
        throw {
          message: `Produto ${value.productGuid} não encontrado.`,
        };
      }
      await this.prisma.demandProduct.create({
        data: {
          amount: value.amount,
          data: new Date(),
          demandId: demand.id,
          productId: product.id,
        },
      });
    }
  }

  async delete(demandGuid: string) {
    const demand = await this.prisma.demand.findUnique({
      where: {
        guid: demandGuid,
      },
    });

    if (!demand) {
      throw {
        message: `Demanda ${demandGuid} não encontrada.`,
      };
    }

    await this.prisma.demandProduct.deleteMany({
      where: {
        demandId: demand.id,
      },
    });

    await this.prisma.demand.delete({
      where: {
        id: demand.id,
      },
    });

    return true;
  }
}
