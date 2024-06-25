import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import {
  CreateTaskPermissionInput,
  CreateTaskPermissionsInput,
  FiltersInput,
  UpdateTaskPermissionInput,
} from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";

@Injectable()
export class TaskPermissionService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTaskPermissionInput: CreateTaskPermissionInput) {
    const { canEdit, userId, taskId } = createTaskPermissionInput;
    const taskPermission = await this.prismaService.taskPermission.create({
      data: {
        canEdit,
        userId,
        taskId,
      },
    });

    return {
      taskPermission,
    };
  }

  async createMany(createtaskPermissionsInput: CreateTaskPermissionsInput) {
    const taskPermissionCreations =
      createtaskPermissionsInput.taskPermissions.map((input) =>
        this.prismaService.taskPermission
          .create({
            data: input,
          })
          .catch(() => {
            console.error("Erro ao criar taskPermission:", input.taskId);
            return null;
          }),
      );

    const results = await Promise.allSettled(taskPermissionCreations);

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

    const total = await this.prismaService.taskPermission.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const objects = await this.prismaService.taskPermission.findMany({
      where: {
        userId,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        user: isFieldRequested(info, "user"),
        task: isFieldRequested(info, "task"),
      },
    });

    return {
      objects,
      total: total.length,
    };
  }

  async findOne(info: GraphQLResolveInfo, id: number) {
    return await this.prismaService.taskPermission.findUnique({
      where: { id },
      include: {
        user: isFieldRequested(info, "user"),
        task: isFieldRequested(info, "task"),
      },
    });
  }

  async update(
    id: number,
    updatetaskPermissionInput: UpdateTaskPermissionInput,
  ) {
    const { userId, taskId, canEdit } = updatetaskPermissionInput;
    return await this.prismaService.taskPermission.update({
      where: {
        id,
      },
      data: {
        userId,
        taskId,
        canEdit,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.taskPermission.delete({
      where: {
        id,
      },
    });
  }
}
