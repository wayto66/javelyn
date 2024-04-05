import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import { CreateQuoteInput, FiltersInput, UpdateQuoteInput } from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";
import { prismaCollectionConnect } from "src/helpers/prismaCollectionConnect";
import { prismaCollectionSet } from "src/helpers/prismaCollectionSet";
import { sortMap } from "src/helpers/sortMap";

@Injectable()
export class QuoteService {
  constructor(private prismaService: PrismaService) {}
  create(createQuoteInput: CreateQuoteInput) {
    const {
      companyId,
      leadId,
      userId,
      value,
      observation,
      tagsIds,
      products,
      customFields,
    } = createQuoteInput;

    return this.prismaService.quote.create({
      data: {
        companyId,
        leadId,
        userId,
        value,
        observation,
        customFields,
        tags: prismaCollectionConnect(tagsIds),
        products: {
          createMany: {
            data: products,
          },
        },
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
          createdAt:
            !dateGt && !dateLt
              ? undefined
              : {
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

    const total = await this.prismaService.quote.findMany({
      where,
      select: {
        id: true,
      },
    });

    const objects = await this.prismaService.quote.findMany({
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

    let filteredQuotes = [...objects];

    if (tagIds.length > 0) {
      filteredQuotes = filteredQuotes.filter((obj) => obj.tags.length > 0);
      if (demandAllConditions) {
        filteredQuotes = filteredQuotes.filter(
          (obj) =>
            obj.tags.length >= tagIds.length &&
            tagIds.every((id) => obj.tags.map((tag) => tag.id).includes(id)),
        );
      }
    }

    return {
      objects: filteredQuotes,
      total: total.length,
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} quote`;
  }
  async update(
    info: GraphQLResolveInfo,
    id: number,
    updateQuoteInput: UpdateQuoteInput,
  ) {
    const {
      companyId,
      leadId,
      userId,
      value,
      observation,
      isActive,
      tagsIds,
      products,
      customFields,
      handledAt,
    } = updateQuoteInput;

    if (products)
      await this.prismaService.quote.update({
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

    return await this.prismaService.quote.update({
      where: {
        id,
      },
      data: {
        companyId,
        leadId,
        userId,
        value,
        observation,
        handledAt,
        isActive,
        tags: prismaCollectionSet(tagsIds),
        customFields,
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
    return await this.prismaService.quote.update({
      where: {
        id,
      },
      data: { isActive: false },
    });
  }
}
