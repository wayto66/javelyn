import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { Response } from "express";

@Controller("webhooks")
export class WebhooksController {
  private readonly VERIFY_TOKEN = "985445b791add467f9bce234c755139c";

  @Get("facebook")
  verifyWebhook(@Query() query: any, @Res() res: Response) {
    // const mode = query["hub.mode"];
    // const token = query["hub.verify_token"];
    // const challenge = query["hub.challenge"];

    console.log(query);

    const mode = "subscribe";
    const token = "985445b791add467f9bce234c755139c";
    const challenge = "123";

    if (mode && token) {
      if (mode === "subscribe" && token === this.VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        res.status(HttpStatus.OK).send(challenge);
      } else {
        res.sendStatus(HttpStatus.FORBIDDEN);
      }
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }

  @Post("facebook")
  handleWebhook(@Body() body: any, @Res() res: Response) {
    const { object, entry } = body;

    if (object === "page") {
      entry.forEach((entry) => {
        const { changes } = entry;
        changes.forEach((change) => {
          if (change.field === "leadgen") {
            const lead = change.value;
            console.log("Lead recebido:", lead);

            // Aqui você pode adicionar a lógica para salvar o lead na sua base de dados
            // ou processá-lo de acordo com sua necessidade.
          }
        });
      });

      res.status(HttpStatus.OK).send("EVENT_RECEIVED");
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
