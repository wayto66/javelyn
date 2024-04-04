-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "customFields" JSONB;

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "customFields" JSONB;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "customFields" JSONB;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "customFields" JSONB;
