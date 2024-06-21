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
import { ILeadGenData } from "./dto";

@Controller("webhooks")
export class WebhooksController {
  private readonly VERIFY_TOKEN = "985445b791add467f9bce234c755139c";

  @Get("facebook")
  verifyWebhook(@Query() query: any, @Res() res: Response) {
    const mode = query["hub.mode"];
    const token = query["hub.verify_token"];
    const challenge = query["hub.challenge"];

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
  handleWebhook(@Body() body: ILeadGenData, @Res() res: Response) {
    console.log({ body });

    if (body) {
      res.status(HttpStatus.OK).send("EVENT_RECEIVED");
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
