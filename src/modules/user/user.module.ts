import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
