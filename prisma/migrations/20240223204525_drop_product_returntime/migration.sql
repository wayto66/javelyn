/*
  Warnings:

  - You are about to drop the column `recommendedProductIds` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedReturnTime` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "recommendedProductIds",
DROP COLUMN "recommendedReturnTime";
