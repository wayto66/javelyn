import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "src/modules/user/user.module";
import { TagResolver } from "./tag.resolver";
import { TagService } from "./tag.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [TagResolver, TagService],
})
export class TagModule {}
