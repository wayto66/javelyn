import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateCategoryInput,
  FiltersInput,
  UpdateCategoryInput,
} from "src/graphql";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryInput: CreateCategoryInput) {
    return await this.prismaService.category.create({
      data: createCategoryInput,
    });
  }

  async findAll(page: number, pageSize: number, filters: FiltersInput) {
    const where = {
      companyId: filters.companyId,
    };
    const total = await this.prismaService.category.findMany({
      where,
      select: {
        id: true,
      },
    });
    const objects = await this.prismaService.category.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      objects,
      total: total.length,
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
