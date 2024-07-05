import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { LeadStatusResolver } from "./lead-status.resolver";
import { LeadStatusService } from "./lead-status.service";

@Module({
  providers: [LeadStatusResolver, LeadStatusService],
  imports: [PrismaModule, UserModule, ExceptionModule],
})
export class LeadStatusModule {}
