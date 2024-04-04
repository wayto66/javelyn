/*
  Warnings:

  - You are about to drop the column `permission` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `statusTrashed` on the `User` table. All the data in the column will be lost.
  - Made the column `leadId` on table `Quote` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_leadId_fkey";

-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "leadId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permission",
DROP COLUMN "statusTrashed",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
