import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { leadPermissionResolver } from "./lead-permission.resolver";
import { LeadPermissionService } from "./lead-permission.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [leadPermissionResolver, LeadPermissionService],
})
export class leadPermissionModule {}
