import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { ThrowResolver } from "./throw.resolver";
import { ThrowService } from "./throw.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [ThrowResolver, ThrowService],
})
export class ThrowModule {}
