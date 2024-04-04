-- CreateEnum
CREATE TYPE "AtributeType" AS ENUM ('LEAD', 'QUOTE', 'TICKET', 'PRODUCT');

-- CreateEnum
CREATE TYPE "AtributeValueType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'STRING_ARRAY', 'NUMBER_ARRAY', 'JSON');

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "types" "AtributeType"[],
    "valueType" "AtributeValueType" NOT NULL,
    "observation" TEXT,
    "handledAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
