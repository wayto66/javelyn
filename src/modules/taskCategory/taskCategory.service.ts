import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateTaskCategoryInput,
  FiltersInput,
  UpdateTaskCategoryInput,
} from "src/graphql";

@Injectable()
export class TaskCategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTaskCategoryInput: CreateTaskCategoryInput) {
    return await this.prismaService.taskCategory.create({
      data: createTaskCategoryInput,
    });
  }

  async findAll(
    info: GraphQLResolveInfo,
    page: number,
    pageSize: number,
    filters: FiltersInput,
  ) {
    const total = await this.prismaService.taskCategory.findMany({
      select: {
        id: true,
      },
    });
    const objects = await this.prismaService.taskCategory.findMany({
      where: {
        companyId: filters.companyId,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      objects,
      total: total.length,
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} taskCategory`;
  }

  async update(id: number, updateTaskCategoryInput: UpdateTaskCategoryInput) {
    return await this.prismaService.taskCategory.update({
      where: {
        id,
      },
      data: updateTaskCategoryInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} taskCategory`;
  }
}
