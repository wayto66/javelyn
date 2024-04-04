import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "src/modules/user/user.module";
import { AttributeResolver } from "./attribute.resolver";
import { AttributeService } from "./attribute.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [AttributeResolver, AttributeService],
})
export class AttributeModule {}
