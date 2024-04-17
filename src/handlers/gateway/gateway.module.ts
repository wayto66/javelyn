import { Module, forwardRef } from "@nestjs/common";
import { WhatsappModule } from "src/modules/whatsapp/whatsapp.module";
import { GatewayService } from "./gateway.service";

@Module({
  providers: [GatewayService],
  exports: [GatewayService],
  imports: [forwardRef(() => WhatsappModule)],
})
export class GatewayModule {}
