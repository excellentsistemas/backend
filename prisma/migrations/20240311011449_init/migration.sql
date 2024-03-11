/*
  Warnings:

  - You are about to drop the column `amount` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Demand` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Demand` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_productId_fkey";

-- AlterTable
ALTER TABLE "Demand" DROP COLUMN "amount",
DROP COLUMN "data",
DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "DemandProduct" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "demandId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "DemandProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemandProduct_guid_key" ON "DemandProduct"("guid");

-- AddForeignKey
ALTER TABLE "DemandProduct" ADD CONSTRAINT "DemandProduct_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandProduct" ADD CONSTRAINT "DemandProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
