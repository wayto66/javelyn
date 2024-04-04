import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { TicketResolver } from "./ticket.resolver";
import { TicketService } from "./ticket.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [TicketResolver, TicketService],
})
export class TicketModule {}
