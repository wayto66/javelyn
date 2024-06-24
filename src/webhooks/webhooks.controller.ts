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
import { ILeadgenEvent, ILojaIntegradaTicketData } from "./dto";
import { WebhooksService } from "./webhooks.service";

@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  private readonly VERIFY_TOKEN = "985445b791add467f9bce234c755139c";
  private readonly EAD_LI_VERIFY_TOKEN = "985445b791add467f9bce234c755139c";
  private readonly ACCESS_TOKEN =
    "EAAaQc0e2UXsBOzHinZCTWDhsZBbf10YaaT7lMb5BlVqIKw0ZCCrRa1z12uoKKj2RFo1ZBQUtCFlkiOcAWFvqQse1my3zZBteZBol3fGLrJEorZBgUdRpYOOuOZCu1jcMGb8B3f0UVXXbHQX3cYZBFBvHjDA850iRqs6bZCkkyZBDIinm6DZAsaEFjOyeidpFZA8coTgvbV4VfBy5VZA2TFVZBqQAIgZD";

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
  async handleWebhook(@Body() body: ILeadgenEvent, @Res() res: Response) {
    const { entry } = body;
    if (entry.length === 0)
      res.status(HttpStatus.BAD_REQUEST).send("No lead entry found.");

    const { changes } = entry[0];

    if (changes.length === 0)
      res.status(HttpStatus.BAD_REQUEST).send("No lead changes found.");

    const lead = changes[0].value;

    const leadgenId = lead.leadgen_id;

    const url = `https://graph.facebook.com/v12.0/${leadgenId}?access_token=${this.ACCESS_TOKEN}`;
    let response: any;
    try {
      response = await axios.get(url);
    } catch (e: any) {
      console.error(e.message);
      res.status(HttpStatus.BAD_REQUEST).send(e.message);
    }

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

  @Post("estiload-loja-integrada")
  async handleWebhookEadLi(
    @Body() body: ILojaIntegradaTicketData,
    // @Res() res: Response,
  ) {
    console.log("🧙‍♂️ LI LEAD WEBHOOK");
    try {
      const { cliente, situacao } = body;

      const {
        nome,
        email,
        sexo,
        telefone_principal,
        telefone_celular,
        data_nascimento,
      } = cliente;

      const lead = await this.webhooksService.handleLiLead({
        companyId: 7,
        userId: 18,
        data_nascimento,
        email,
        nome,
        sexo,
        situacao: situacao.nome,
        telefone_celular,
        telefone_principal,
      });

      return lead;
    } catch (e: any) {
      return e.message;
    }
  }
}
