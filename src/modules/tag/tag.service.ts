import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import { CreateTagInput, FiltersInput, UpdateTagInput } from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}
  async create(createTagInput: CreateTagInput) {
    return this.prismaService.tag.create({
      data: {
        companyId: createTagInput.companyId,
        name: createTagInput.name,
        colorHex: createTagInput.colorHex,
        description: createTagInput.description,
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
    const total = await this.prismaService.tag.findMany({
      where,
      select: {
        id: true,
      },
    });
    const objects = await this.prismaService.tag.findMany({
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
    return this.prismaService.tag.findUnique({
      where: { id: id },
      include: {
        leads: isFieldRequested(info, "leads"),
      },
    });
  }

  async update(id: number, updateTagInput: UpdateTagInput) {
    return this.prismaService.tag.update({
      where: {
        id: id,
      },
      data: {
        companyId: updateTagInput.companyId,
        name: updateTagInput.name,
        colorHex: updateTagInput.colorHex,
        description: updateTagInput.description,
        isActive: updateTagInput.isActive,
        products: updateTagInput.productsIds
          ? {
              set: updateTagInput.productsIds?.map((id) => {
                return { id: id };
              }),
            }
          : undefined,
        leads: updateTagInput.leadsIds
          ? {
              set: updateTagInput.leadsIds?.map((id) => {
                return { id: id };
              }),
            }
          : undefined,
        quotes: updateTagInput.quotesIds
          ? {
              set: updateTagInput.quotesIds?.map((id) => {
                return { id: id };
              }),
            }
          : undefined,
        tickets: updateTagInput.ticketsIds
          ? {
              set: updateTagInput.ticketsIds?.map((id) => {
                return { id: id };
              }),
            }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.tag.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
