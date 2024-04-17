import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import {
  CreateTaskCategoryInput,
  FiltersInput,
  UpdateTaskCategoryInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { TaskCategoryService } from "./taskCategory.service";

@Resolver("TaskCategory")
export class TaskCategoryResolver {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @UseGuards(AuthGuard)
  @Mutation("createTaskCategory")
  create(
    @Args("createTaskCategoryInput")
    createTaskCategoryInput: CreateTaskCategoryInput,
  ) {
    return this.taskCategoryService.create(createTaskCategoryInput);
  }

  @Query("taskCategories")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.taskCategoryService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("taskCategory")
  findOne(@Args("id") id: number) {
    return this.taskCategoryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateTaskCategory")
  update(
    @Args("updateTaskCategoryInput")
    updateTaskCategoryInput: UpdateTaskCategoryInput,
  ) {
    return this.taskCategoryService.update(
      updateTaskCategoryInput.id,
      updateTaskCategoryInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeTaskCategory")
  remove(@Args("id") id: number) {
    return this.taskCategoryService.remove(id);
  }
}
