import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { LeadResolver } from "./lead.resolver";
import { LeadService } from "./lead.service";

@Module({
  imports: [PrismaModule, UserModule, ExceptionModule],
  providers: [LeadResolver, LeadService],
})
export class LeadModule {}
