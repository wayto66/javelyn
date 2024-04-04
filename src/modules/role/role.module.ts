import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { RoleResolver } from "./role.resolver";
import { RoleService } from "./role.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [RoleResolver, RoleService],
})
export class RoleModule {}
