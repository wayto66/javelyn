import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { CreateTaskInput, FiltersInput, UpdateTaskInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { TaskService } from "./task.service";

@Resolver("Task")
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Mutation("createTask")
  create(@Args("createTaskInput") createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @UseGuards(AuthGuard)
  @Query("tasks")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.taskService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("task")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.taskService.findOne(info, id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateTask")
  update(
    @Args("updateTaskInput") updateTaskInput: UpdateTaskInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.taskService.update(info, updateTaskInput.id, updateTaskInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("removeTask")
  remove(@Args("id") id: number) {
    return this.taskService.remove(id);
  }
}
