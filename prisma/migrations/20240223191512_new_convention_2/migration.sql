/*
  Warnings:

  - You are about to drop the `Quote_Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket_Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quote_Product" DROP CONSTRAINT "Quote_Product_productId_fkey";

-- DropForeignKey
ALTER TABLE "Quote_Product" DROP CONSTRAINT "Quote_Product_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket_Product" DROP CONSTRAINT "Ticket_Product_productId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket_Product" DROP CONSTRAINT "Ticket_Product_ticketId_fkey";

-- DropTable
DROP TABLE "Quote_Product";

-- DropTable
DROP TABLE "Ticket_Product";

-- CreateTable
CREATE TABLE "TicketProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TicketProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quoteId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "QuoteProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketProduct" ADD CONSTRAINT "TicketProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketProduct" ADD CONSTRAINT "TicketProduct_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteProduct" ADD CONSTRAINT "QuoteProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteProduct" ADD CONSTRAINT "QuoteProduct_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
