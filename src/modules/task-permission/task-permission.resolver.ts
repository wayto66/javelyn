import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import {
  CreateTaskPermissionInput,
  CreateTaskPermissionsInput,
  FiltersInput,
  UpdateTaskPermissionInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { TaskPermissionService } from "./task-permission.service";

@Resolver("taskPermission")
export class TaskPermissionResolver {
  constructor(private readonly taskPermissionService: TaskPermissionService) {}

  @UseGuards(AuthGuard)
  @Mutation("createTaskPermission")
  create(
    @Args("createTaskPermissionInput")
    createTaskPermissionInput: CreateTaskPermissionInput,
  ) {
    return this.taskPermissionService.create(createTaskPermissionInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("createTaskPermissions")
  createMany(
    @Args("createTaskPermissionsInput")
    createTaskPermissionsInput: CreateTaskPermissionsInput,
  ) {
    return this.taskPermissionService.createMany(createTaskPermissionsInput);
  }

  @UseGuards(AuthGuard)
  @Query("taskPermissions")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.taskPermissionService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("taskPermission")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.taskPermissionService.findOne(info, id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateTaskPermission")
  update(
    @Args("updateTaskPermissionInput")
    updateTaskPermissionInput: UpdateTaskPermissionInput,
  ) {
    return this.taskPermissionService.update(
      updateTaskPermissionInput.id,
      updateTaskPermissionInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeTaskPermission")
  remove(@Args("id") id: number) {
    return this.taskPermissionService.remove(id);
  }
}
