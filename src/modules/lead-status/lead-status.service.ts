import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import { FiltersInput } from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";
import { CreateLeadStatusInput } from "./dto/create-lead-status.input";
import { UpdateLeadStatusInput } from "./dto/update-lead-status.input";

@Injectable()
export class LeadStatusService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createLeadStatusInput: CreateLeadStatusInput) {
    const { name, companyId } = createLeadStatusInput;
    return this.prismaService.leadStatus.create({
      data: {
        name,
        companyId,
      },
    });
  }

  async findAll(
    info: GraphQLResolveInfo,
    page: number,
    pageSize: number,
    filters: FiltersInput,
  ) {
    const { name, includeInactive, companyId } = filters;

    const objects = await this.prismaService.leadStatus.findMany({
      where: {
        name,
        companyId,
        isActive: includeInactive,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        leads: isFieldRequested(info, "leads"),
      },
    });

    return {
      objects,
      total: objects.length,
    };
  }

  async findOne(info: GraphQLResolveInfo, id: number) {
    return await this.prismaService.leadStatus.findUnique({
      where: { id },
      include: {
        leads: isFieldRequested(info, "leads"),
      },
    });
  }

  update(id: number, updateLeadStatusInput: UpdateLeadStatusInput) {
    return this.prismaService.leadStatus.update({
      where: {
        id,
      },
      data: updateLeadStatusInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} leadStatus`;
  }
}
