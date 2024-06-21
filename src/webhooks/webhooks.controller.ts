import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import axios from "axios";
import { Response } from "express";

@Controller("webhooks")
export class WebhooksController {
  private readonly VERIFY_TOKEN = "985445b791add467f9bce234c755139c";
  private readonly ACCESS_TOKEN =
    "EAAaQc0e2UXsBO5pQPHJLobQa5oyZBr943lo9lHUPpvzTZAKujKykaEarg80ZC0isfE3Q9SWCin0UOmPLKhPzPei225NVviWQcSSbFTWZCkt23f5BnVVrmFknTdqJ0u145UJayQBLT7MuPxna5uFwhMmzkokPCd2nIf7U6ZAZBA0QMIBOVGBxb7zs8pIvYaaciiv1qlcSe3QTI9ekGsNV2maofIEbre";

  private readonly COMPANY_BOT_ID_MAP: Record<
    string,
    {
      userId: number;
      companyId: number;
    }
  > = {};

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
  async handleWebhook(@Body() body: any, @Res() res: Response) {
    const { entry } = body;

    console.log(JSON.stringify(entry));

    const leadgenId = entry.value.leadgen_id;

    const url = `https://graph.facebook.com/v12.0/${leadgenId}?access_token=${this.ACCESS_TOKEN}`;
    const response = await axios.get(url);
    const leadDetails = response.data;

    const name = leadDetails.field_data.find(
      (field) => field.name === "full_name",
    )?.values[0];
    const email = leadDetails.field_data.find((field) => field.name === "email")
      ?.values[0];
    const phone = leadDetails.field_data.find(
      (field) => field.name === "phone_number",
    )?.values[0];

    console.log({ name, email, phone, leadDetails });

    if (body) {
      res.status(HttpStatus.OK).send("EVENT_RECEIVED");
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  }
}
