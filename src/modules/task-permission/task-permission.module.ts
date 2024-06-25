import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { TaskPermissionResolver } from "./task-permission.resolver";
import { TaskPermissionService } from "./task-permission.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [TaskPermissionResolver, TaskPermissionService],
})
export class taskPermissionModule {}
