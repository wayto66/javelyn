import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { CompanyResolver } from "./company.resolver";
import { CompanyService } from "./company.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
