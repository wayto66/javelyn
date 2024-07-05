/*
  Warnings:

  - You are about to drop the column `status` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "status",
ADD COLUMN     "statusName" TEXT;

-- CreateTable
CREATE TABLE "LeadStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeadStatus_name_key" ON "LeadStatus"("name");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_statusName_fkey" FOREIGN KEY ("statusName") REFERENCES "LeadStatus"("name") ON DELETE SET NULL ON UPDATE CASCADE;
