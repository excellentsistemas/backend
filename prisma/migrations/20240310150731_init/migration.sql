/*
  Warnings:

  - Added the required column `mimeType` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
