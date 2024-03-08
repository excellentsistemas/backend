import { injectable } from 'inversify';
import { Demand, PrismaClient } from '@prisma/client';

@injectable()
export class DemandService {
  constructor(private readonly prisma = new PrismaClient()) {}

  async getAll() {
    return await this.prisma.demand.findMany();
  }

  async create(demand: Demand) {
    return await this.prisma.demand.create({
      data: {
        amount: demand.amount,
        data: demand.data,
        userId: demand.userId,
        productId: demand.productId,
      },
    });
  }

  async delete(guid: string) {
    return await this.prisma.demand.findMany();
  }
}
