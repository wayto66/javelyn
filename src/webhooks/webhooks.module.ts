import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { WebhooksController } from "./webhooks.controller";
import { WebhooksService } from "./webhooks.service";

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService],
  exports: [WebhooksService],
  imports: [PrismaService],
})
export class WebhooksModule {}
