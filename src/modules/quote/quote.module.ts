import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { QuoteResolver } from "./quote.resolver";
import { QuoteService } from "./quote.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [QuoteResolver, QuoteService],
})
export class QuoteModule {}
