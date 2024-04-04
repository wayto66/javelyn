import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { GatewayModule } from "src/handlers/gateway/gateway.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { UserModule } from "../user/user.module";
import { WhatsappResolver } from "./whatsapp.resolver";
import { WhatsappService } from "./whatsapp.service";

@Module({
  imports: [
    PrismaModule,
    WhatsappModule,
    ExceptionModule,
    GatewayModule,
    UserModule,
  ],
  providers: [WhatsappResolver, WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
