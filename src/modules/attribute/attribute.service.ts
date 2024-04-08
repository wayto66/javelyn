import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateAttributeInput,
  FiltersInput,
  UpdateAttributeInput,
} from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";

@Injectable()
export class AttributeService {
  constructor(private prismaService: PrismaService) {}
  async create(createAttributeInput: CreateAttributeInput) {
    const { companyId, userId, name, observation, types, valueType } =
      createAttributeInput;
    return this.prismaService.attribute.create({
      data: {
        companyId,
        name,
        observation,
        userId,
        types,
        valueType,
      },
    });
  }

  async findAll(page: number, pageSize: number, filters: FiltersInput) {
    const where: any = {
      name: filters.name
        ? {
            contains: filters.name,
            mode: "insensitive",
          }
        : undefined,
      OR: filters.includeInactive
        ? [{ isActive: true }, { isActive: false }]
        : [{ isActive: true }],
      companyId: filters.companyId,
    };
    const total = await this.prismaService.attribute.findMany({
      where,

      select: {
        id: true,
      },
    });
    const objects = await this.prismaService.attribute.findMany({
      where,

      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      objects,
      total: total.length,
    };
  }

  async findOne(id: number, info: GraphQLResolveInfo) {
    return this.prismaService.attribute.findUnique({
      where: { id: id },
      include: {
        user: isFieldRequested(info, "user"),
      },
    });
  }

  async update(id: number, updateAttributeInput: UpdateAttributeInput) {
    const { companyId, types, name, observation, valueType, isActive } =
      updateAttributeInput;
    return this.prismaService.attribute.update({
      where: {
        id: id,
      },
      data: {
        companyId,
        types,
        valueType,
        name,
        observation,
        isActive,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.attribute.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
