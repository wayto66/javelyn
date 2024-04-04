import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateTicketInput,
  FiltersInput,
  UpdateTicketInput,
} from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";
import { prismaCollectionConnect } from "src/helpers/prismaCollectionConnect";
import { prismaCollectionSet } from "src/helpers/prismaCollectionSet";
import { sortMap } from "src/helpers/sortMap";

@Injectable()
export class TicketService {
  constructor(private prismaService: PrismaService) {}
  create(createTicketInput: CreateTicketInput) {
    const {
      companyId,
      leadId,
      userId,
      value,
      observation,
      origin,
      tagsIds,
      products,
      customFields,
    } = createTicketInput;

    return this.prismaService.ticket.create({
      data: {
        companyId,
        leadId,
        userId,
        value,
        observation,
        origin,
        tags: prismaCollectionConnect(tagsIds),
        products: {
          createMany: {
            data: products,
          },
        },
        customFields,
      },
    });
  }

  async findAll(
    info: GraphQLResolveInfo,
    page: number,
    pageSize: number,
    filters: FiltersInput,
  ) {
    const {
      name,
      sort,
      includeInactive,
      tagIds,
      productIds,
      demandAllConditions,
      dateGt,
      dateLt,
      companyId,
    } = filters;

    const isFiltersEmpty = (filters: FiltersInput) => {
      if (
        filters.name?.length === 0 &&
        filters.tagIds?.length === 0 &&
        filters.productIds?.length === 0
      )
        return true;
      return false;
    };

    const tagIdsFilter =
      tagIds && tagIds.length > 0
        ? {
            some: {
              id: {
                in: tagIds,
              },
            },
          }
        : undefined;

    const where = isFiltersEmpty(filters)
      ? {
          isActive: includeInactive ? undefined : true,
          createdAt: {
            gt: dateGt ? new Date(dateGt) : undefined,
            lt: dateLt ? new Date(dateLt) : undefined,
          },

          companyId,
        }
      : {
          [demandAllConditions ? "AND" : "OR"]: [
            name && name.length > 0
              ? {
                  lead: {
                    name: {
                      contains: name,
                      mode: "insensitive",
                    },
                  },
                }
              : {},

            { tags: tagIdsFilter },
            productIds?.length > 0
              ? {
                  products: {
                    some: {
                      productId: {
                        in: productIds,
                      },
                    },
                  },
                }
              : {},
          ],
          isActive: includeInactive ? undefined : true,
          createdAt: {
            gt: dateGt ? new Date(dateGt) : undefined,
            lt: dateLt ? new Date(dateLt) : undefined,
          },
          companyId,
        };

    const total = await this.prismaService.ticket.findMany({
      where,
      select: {
        id: true,
      },
    });

    const objects = await this.prismaService.ticket.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        tags: isFieldRequested(info, "tags"),
        user: isFieldRequested(info, "user"),
        lead: isFieldRequested(info, "lead"),
        products: isFieldRequested(info, "products"),
      },

      orderBy: sortMap.get(sort),
    });

    let filteredTickets = [...objects];

    if (tagIds.length > 0) {
      filteredTickets = filteredTickets.filter((obj) => obj.tags.length > 0);
      if (demandAllConditions) {
        filteredTickets = filteredTickets.filter(
          (obj) =>
            obj.tags.length >= tagIds.length &&
            tagIds.every((id) => obj.tags.map((tag) => tag.id).includes(id)),
        );
      }
    }

    console.log(JSON.stringify(where));

    return {
      objects: filteredTickets,
      total: total.length,
    };
  }

  findOne(info: GraphQLResolveInfo, id: number) {
    return this.prismaService.ticket.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    info: GraphQLResolveInfo,
    id: number,
    updateTicketInput: UpdateTicketInput,
  ) {
    const {
      companyId,
      leadId,
      userId,
      value,
      observation,
      origin,
      isActive,
      tagsIds,
      products,
      customFields,
    } = updateTicketInput;
    if (products)
      await this.prismaService.ticket.update({
        where: {
          id,
        },
        data: {
          products: {
            deleteMany: {
              id: {
                not: 0,
              },
            },
          },
        },
      });

    return await this.prismaService.ticket.update({
      where: {
        id,
      },
      data: {
        companyId,
        leadId,
        userId,
        value,
        observation,
        origin,
        isActive,
        customFields,
        tags: prismaCollectionSet(tagsIds),
        products: products
          ? {
              createMany: {
                data: products,
              },
            }
          : undefined,
      },
      include: {
        lead: isFieldRequested(info, "lead"),
        products: isFieldRequested(info, "products"),
        user: isFieldRequested(info, "user"),
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.ticket.update({
      where: {
        id,
      },
      data: { isActive: false },
    });
  }
}
