import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { IHandleLiLeadParams } from "./dto";

@Injectable()
export class WebhooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async handleLiLead({
    data_nascimento,
    email,
    nome,
    sexo,
    situacao,
    telefone_celular,
    telefone_principal,
    companyId,
    userId,
  }: IHandleLiLeadParams) {
    const leadCheck = await this.prismaService.lead.findFirst({
      where: {
        name: nome,
        companyId,
      },
    });

    const customFields: Record<string, any> = leadCheck
      ? {
          ...(leadCheck.customFields as object),
        }
      : {};

    customFields.Situacao = situacao;
    customFields.Sexo = sexo;

    if (situacao === "Enviado") {
      if (customFields.Compras) {
        customFields.Compras = customFields.Compras + 1;
      } else {
        customFields.Compras = 1;
      }
    }

    const birthdaySplit = data_nascimento?.split("-");
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
}
