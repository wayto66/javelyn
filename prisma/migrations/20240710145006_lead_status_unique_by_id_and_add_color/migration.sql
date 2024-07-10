/*
  Warnings:

  - You are about to drop the column `statusName` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `color` to the `LeadStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_statusName_fkey";

-- DropIndex
DROP INDEX "LeadStatus_name_key";

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "statusName",
ADD COLUMN     "statusId" INTEGER;

-- AlterTable
ALTER TABLE "LeadStatus" ADD COLUMN     "color" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "LeadStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
