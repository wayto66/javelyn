import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
