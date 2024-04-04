import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { TaskCategoryResolver } from "./taskCategory.resolver";
import { TaskCategoryService } from "./taskCategory.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [TaskCategoryResolver, TaskCategoryService],
})
export class TaskCategoryModule {}
