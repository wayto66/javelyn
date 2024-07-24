-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "sortIndex" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "LeadStatus" ADD COLUMN     "sortIndex" INTEGER NOT NULL DEFAULT 0;
