import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import {
  ConnectWhatsappInput,
  DisconnectWhatsappInput,
  SendMessageInput,
  ShutdownWhatsappInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { WhatsappService } from "./whatsapp.service";

@Resolver("Whatsapp")
export class WhatsappResolver {
  constructor(private readonly whatsappService: WhatsappService) {}

  @UseGuards(AuthGuard)
  @Mutation("connectWhatsapp")
  connectWhatsapp(
    @Args("connectWhatsappInput") connectWhatsappInput: ConnectWhatsappInput,
  ) {
    return this.whatsappService.connect(connectWhatsappInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("shutdownWhatsapp")
  shutdownWhatsapp(
    @Args("shutdownWhatsappInput") shutdownWhatsappInput: ShutdownWhatsappInput,
  ) {
    return this.whatsappService.shutdown(shutdownWhatsappInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("sendMessage")
  sendMessage(@Args("sendMessageInput") sendMessageInput: SendMessageInput) {
    return this.whatsappService.sendMessage(sendMessageInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("disconnectWhatsapp")
  disconnectWhatsapp(
    @Args("disconnectWhatsappInput")
    disconnectWhatsappInput: DisconnectWhatsappInput,
  ) {
    return this.whatsappService.disconnect(disconnectWhatsappInput);
  }
}
