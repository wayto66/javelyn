import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { IHandleLiLeadParams, IHandleMetaLeadParams } from "./dto";

@Injectable()
export class WebhooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async handleLiLead(data: IHandleLiLeadParams) {
    const {
      data_nascimento,
      email,
      nome,
      sexo,
      situacao,
      telefone_celular,
      telefone_principal,
      companyId,
      userId,
    } = data;
    const leadCheck = await this.prismaService.lead.findFirst({
      where: {
        name: nome,
        companyId,
        phone: telefone_principal ?? telefone_celular,
      },
    });

    const customFields: Record<string, any> = leadCheck
      ? (leadCheck.customFields as object)
      : {};

    customFields.Situacao = situacao;
    customFields.Sexo = sexo;

    if (situacao === "Pedido Enviado") {
      customFields["Ja Comprou"] = 2;
      if (customFields.Compras) {
        customFields.Compras = customFields.Compras + 1;
      } else {
        customFields.Compras = 1;
      }
    }

    const birthdaySplit = data_nascimento ? data_nascimento.split("-") : [];
    let birthdayYear: number | undefined;
    let birthdayMonth: number | undefined;
    let birthdayDay: number | undefined;

    if (birthdaySplit && birthdaySplit.length === 3) {
      birthdayYear = Number(data_nascimento.split("-")[0]);
      birthdayMonth = Number(data_nascimento.split("-")[1]);
      birthdayDay = Number(data_nascimento.split("-")[2]);
    }

    const lead = await this.prismaService.lead.upsert({
      where: {
        companyId_name_phone: {
          companyId,
          name: nome,
          phone: telefone_principal,
        },
      },
      update: {
        customFields,
      },
      create: {
        name: nome,
        birthdayYear,
        birthdayMonth,
        birthdayDay,
        companyId,
        userId,
        phone: telefone_principal ?? telefone_celular,
        mail: email,
        customFields,
      },
    });

    return {
      lead,
    };
  }

  async handleMetaLead(data: IHandleMetaLeadParams) {
    const { mail, formId, name, phone, customFields } = data;

    const webhookData = await this.prismaService.webhookIdentifier.findUnique({
      where: {
        formId,
      },
    });

    if (!webhookData) throw new BadRequestException("Invalid formId");

    const { companyId, userId } = webhookData;

    const lead = await this.prismaService.lead.upsert({
      where: {
        companyId_name_phone: {
          companyId,
          name,
          phone,
        },
      },
      update: {
        customFields,
      },
      create: {
        name,
        companyId,
        userId,
        phone,
        mail,
        customFields,
      },
    });

    return {
      lead,
    };
  }
}
