/*
  Warnings:

  - The required column `guid` was added to the `Demand` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `guid` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `guid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "guid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "guid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "guid" TEXT NOT NULL;
