import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { CategoryResolver } from "./category.resolver";
import { CategoryService } from "./category.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
