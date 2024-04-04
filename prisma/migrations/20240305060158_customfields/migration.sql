-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "customFields" JSONB;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "customFields" JSONB;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "permissions" DROP NOT NULL;
