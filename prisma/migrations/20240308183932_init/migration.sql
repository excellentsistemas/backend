/*
  Warnings:

  - A unique constraint covering the columns `[guid]` on the table `Demand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guid]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Demand_guid_key" ON "Demand"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_guid_key" ON "Product"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "User_guid_key" ON "User"("guid");
