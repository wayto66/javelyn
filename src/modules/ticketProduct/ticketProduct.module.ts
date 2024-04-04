import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { TicketProductResolver } from "./ticketProduct.resolver";
import { TicketProductService } from "./ticketProduct.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [TicketProductResolver, TicketProductService],
})
export class TicketProductModule {}
