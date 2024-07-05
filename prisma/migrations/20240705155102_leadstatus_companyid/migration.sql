/*
  Warnings:

  - Added the required column `companyId` to the `LeadStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeadStatus" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LeadStatus" ADD CONSTRAINT "LeadStatus_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
