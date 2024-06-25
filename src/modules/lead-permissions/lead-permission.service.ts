import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateLeadPermissionInput,
  CreateLeadPermissionsInput,
  FiltersInput,
  UpdateLeadPermissionInput,
} from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";

@Injectable()
export class LeadPermissionService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createLeadPermissionInput: CreateLeadPermissionInput) {
    const { canEdit, userId, leadId } = createLeadPermissionInput;
    const leadPermission = await this.prismaService.leadPermission.create({
      data: {
        canEdit,
        userId,
        leadId,
      },
    });

    return {
      leadPermission,
    };
  }

  async createMany(createleadPermissionsInput: CreateLeadPermissionsInput) {
    const leadPermissionCreations =
      createleadPermissionsInput.leadPermissions.map((input) =>
        this.prismaService.leadPermission
          .create({
            data: input,
          })
          .catch(() => {
            console.error("Erro ao criar leadPermission:", input.leadId);
            return null;
          }),
      );

    const results = await Promise.allSettled(leadPermissionCreations);

    const successfulCreations = results.filter(
      (result) => result.status === "fulfilled" && result.value !== null,
    ).length;

    return {
      count: successfulCreations,
    };
  }

  async findAll(
    info: GraphQLResolveInfo,
    page: number,
    pageSize: number,
    filters: FiltersInput,
  ) {
    const { userId } = filters;

    const total = await this.prismaService.leadPermission.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const objects = await this.prismaService.leadPermission.findMany({
      where: {
        userId,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        user: isFieldRequested(info, "user"),
        lead: isFieldRequested(info, "lead"),
      },
    });

    return {
      objects,
      total: total.length,
    };
  }

  async findOne(info: GraphQLResolveInfo, id: number) {
    return await this.prismaService.leadPermission.findUnique({
      where: { id },
      include: {
        user: isFieldRequested(info, "user"),
        lead: isFieldRequested(info, "lead"),
      },
    });
  }

  async update(
    id: number,
    updateleadPermissionInput: UpdateLeadPermissionInput,
  ) {
    const { userId, leadId, canEdit } = updateleadPermissionInput;
    return await this.prismaService.leadPermission.update({
      where: {
        id,
      },
      data: {
        userId,
        leadId,
        canEdit,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.leadPermission.delete({
      where: {
        id,
      },
    });
  }
}
