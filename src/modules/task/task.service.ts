import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import { CreateTaskInput, FiltersInput, UpdateTaskInput } from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";
import { sortMap } from "src/helpers/sortMap";

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}
  async create(createTaskInput: CreateTaskInput) {
    const {
      body,
      categoryId,
      conclusion,
      observation,
      title,
      userId,
      companyId,
      leadIds,
      targetDate,
    } = createTaskInput;
    return this.prismaService.task.create({
      data: {
        body,
        categoryId,
        conclusion,
        observation,
        title,
        userId,
        targetDate,
        companyId,
        targets: {
          connect: leadIds.map((id) => {
            return { id };
          }),
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
      userId,
      companyId,
      dateGt,
      dateLt,
      includeHandled,
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
          isActive: includeInactive ? undefined : true,
          isHandled: includeHandled ? undefined : false,
          userId: userId,
          targetDate:
            dateGt && dateLt
              ? {
                  gt: dateGt,
                  lt: dateLt,
                }
              : undefined,
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
          isHandled: includeHandled ? undefined : false,
          companyId,
          userId: userId,
          targetDate:
            dateGt && dateLt
              ? {
                  gt: dateGt,
                  lt: dateLt,
                }
              : undefined,
        };

    const total = await this.prismaService.task.findMany({
      where,
      select: {
        id: true,
      },
    });

    const objects = await this.prismaService.task.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        tags: isFieldRequested(info, "tags"),
        targets: isFieldRequested(info, "targets"),
        user: isFieldRequested(info, "user"),
        category: true,
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

    console.log(where);

    return {
      objects: filteredProducts,
      total: total.length,
    };
  }
  async findOne(info: GraphQLResolveInfo, id: number) {
    return this.prismaService.task.findUnique({
      where: {
        id,
      },
      include: {
        targets: isFieldRequested(info, "targets"),
        quotes: isFieldRequested(info, "quotes"),
        user: isFieldRequested(info, "user"),
      },
    });
  }

  async update(
    info: GraphQLResolveInfo,
    id: number,
    updateTaskInput: UpdateTaskInput,
  ) {
    const {
      body,
      categoryId,
      conclusion,
      handledAt,
      isActive,
      isHandled,
      observation,
      title,
      userId,
    } = updateTaskInput;
    return this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        body,
        categoryId,
        conclusion,
        handledAt,
        isActive,
        isHandled,
        observation,
        title,
        userId,
      },
      include: {
        tags: isFieldRequested(info, "tags"),
        targets: isFieldRequested(info, "targets"),
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
