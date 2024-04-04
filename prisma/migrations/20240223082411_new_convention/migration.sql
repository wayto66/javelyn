/*
  Warnings:

  - You are about to drop the column `company_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `max_whatsapp_slots` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp_slots` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ad_origin` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `birthday_day` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `birthday_month` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `birthday_year` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `house_number` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `is_rescue` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `handled_at` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `lead_id` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Quote_Product` table. All the data in the column will be lost.
  - You are about to drop the column `quote_id` on the `Quote_Product` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `handled_at` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `is_handled` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `target_date` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Throw` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Throw` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Throw` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `lead_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Ticket_Product` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `Ticket_Product` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zap_qrcode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zap_status` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,name,phone]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId,CPF]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId,name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Quote_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteId` to the `Quote_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Throw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Throw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leadId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Ticket_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketId` to the `Ticket_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "Quote_Product" DROP CONSTRAINT "Quote_Product_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Quote_Product" DROP CONSTRAINT "Quote_Product_quote_id_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Throw" DROP CONSTRAINT "Throw_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket_Product" DROP CONSTRAINT "Ticket_Product_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket_Product" DROP CONSTRAINT "Ticket_Product_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_company_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- DropIndex
DROP INDEX "Lead_company_id_CPF_key";

-- DropIndex
DROP INDEX "Lead_company_id_name_phone_key";

-- DropIndex
DROP INDEX "Product_company_id_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "max_whatsapp_slots",
DROP COLUMN "updated_at",
DROP COLUMN "whatsapp_slots",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxWhatsappSlots" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "whatsappSlots" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "ad_origin",
DROP COLUMN "birthday_day",
DROP COLUMN "birthday_month",
DROP COLUMN "birthday_year",
DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "house_number",
DROP COLUMN "is_active",
DROP COLUMN "is_rescue",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "adOrigin" TEXT,
ADD COLUMN     "birthdayDay" INTEGER,
ADD COLUMN     "birthdayMonth" INTEGER,
ADD COLUMN     "birthdayYear" INTEGER,
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "houseNumber" INTEGER,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isRescue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category_id",
DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "handled_at",
DROP COLUMN "is_active",
DROP COLUMN "lead_id",
DROP COLUMN "ticket_id",
DROP COLUMN "updated_at",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "handledAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "leadId" INTEGER,
ADD COLUMN     "ticketId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Quote_Product" DROP COLUMN "product_id",
DROP COLUMN "quote_id",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "quoteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "handled_at",
DROP COLUMN "is_active",
DROP COLUMN "is_handled",
DROP COLUMN "target_date",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "handledAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isHandled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "targetDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Throw" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "user_id",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "lead_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "leadId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket_Product" DROP COLUMN "product_id",
DROP COLUMN "ticket_id",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "ticketId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "role_id",
DROP COLUMN "updated_at",
DROP COLUMN "zap_qrcode",
DROP COLUMN "zap_status",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "zapQrcode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "zapStatus" TEXT NOT NULL DEFAULT 'disconnected';

-- CreateIndex
CREATE UNIQUE INDEX "Lead_companyId_name_phone_key" ON "Lead"("companyId", "name", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_companyId_CPF_key" ON "Lead"("companyId", "CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Product_companyId_name_key" ON "Product"("companyId", "name");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Product" ADD CONSTRAINT "Ticket_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Product" ADD CONSTRAINT "Ticket_Product_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote_Product" ADD CONSTRAINT "Quote_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote_Product" ADD CONSTRAINT "Quote_Product_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Throw" ADD CONSTRAINT "Throw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
