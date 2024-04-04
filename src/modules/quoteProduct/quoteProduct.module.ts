import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { QuoteProductResolver } from "./quoteProduct.resolver";
import { QuoteProductService } from "./quoteProduct.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [QuoteProductResolver, QuoteProductService],
})
export class QuoteProductModule {}
