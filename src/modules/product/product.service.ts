import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateProductInput,
  FiltersInput,
  UpdateProductInput,
} from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";
import { prismaCollectionSet } from "src/helpers/prismaCollectionSet";
import { sortMap } from "src/helpers/sortMap";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductInput: CreateProductInput) {
    return await this.prismaService.product.create({
      data: {
        name: createProductInput.name,
        categoryId: createProductInput.categoryId,
        companyId: createProductInput.companyId,
        value: createProductInput.value,
        sku: createProductInput.sku,
        tags: {
          connect:
            createProductInput.tagsIds.map((id) => {
              return { id: id };
            }) ?? [],
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
      demandAllConditions,
      categoryId,
      companyId,
    } = filters;

    const isFiltersEmpty = (filters: FiltersInput) => {
      if (
        filters.name?.length > 0 ||
        filters.tagIds?.length > 0 ||
        filters.categoryId
      )
        return false;
      return true;
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
          companyId,
        }
      : {
          [demandAllConditions ? "AND" : "OR"]: [
            name && name.length > 0
              ? {
                  OR: [
                    {
                      name: {
                        contains: name,
                        mode: "insensitive",
                      },
                    },
                    {
                      sku: {
                        contains: name,
                        mode: "insensitive",
                      },
                    },
                  ],
                }
              : {},

            { tags: tagIdsFilter },
            { categoryId: categoryId },
          ],
          isActive: includeInactive ? undefined : true,
          companyId,
        };

    const total = await this.prismaService.product.findMany({
      where,
      select: {
        id: true,
      },
    });

    const objects = await this.prismaService.product.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        tags: isFieldRequested(info, "tags"),
        category: isFieldRequested(info, "category"),
      },

      orderBy: sortMap.get(sort),
    });

    let filteredProducts = [...objects];

    if (tagIds?.length > 0) {
      filteredProducts = filteredProducts.filter((obj) => obj.tags.length > 0);
      if (demandAllConditions) {
        filteredProducts = filteredProducts.filter(
          (obj) =>
            obj.tags.length >= tagIds.length &&
            tagIds.every((id) => obj.tags.map((tag) => tag.id).includes(id)),
        );
      }
    }

    return {
      objects: filteredProducts,
      total: total.length,
    };
  }

  async findOne(id: number, info: GraphQLResolveInfo) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        tags: isFieldRequested(info, "tags"),
        category: isFieldRequested(info, "category"),
      },
    });
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const {
      categoryId,
      companyId,
      isActive,
      name,
      tagsIds,
      value,
      sku,
      customFields,
    } = updateProductInput;
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        name,
        companyId,
        categoryId,
        value,
        isActive,
        sku,
        tags: prismaCollectionSet(tagsIds),
        customFields,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
