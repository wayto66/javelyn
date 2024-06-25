-- CreateEnum
CREATE TYPE "EPermissions" AS ENUM ('THROW', 'TASK_CATEGORIES', 'SEE_ALL_LEADS', 'SEE_ALL_TASKS');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "permissions" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WebhookIdentifier" (
    "id" SERIAL NOT NULL,
    "formId" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebhookIdentifier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebhookIdentifier_formId_key" ON "WebhookIdentifier"("formId");

-- AddForeignKey
ALTER TABLE "WebhookIdentifier" ADD CONSTRAINT "WebhookIdentifier_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebhookIdentifier" ADD CONSTRAINT "WebhookIdentifier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
