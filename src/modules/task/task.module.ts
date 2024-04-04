import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { TaskResolver } from "./task.resolver";
import { TaskService } from "./task.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
