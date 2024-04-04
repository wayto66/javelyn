import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { CreateUserInput, FiltersInput, UpdateUserInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Mutation("createUser")
  create(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query("users")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.userService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("user")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.userService.findOne(id, info);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateUser")
  update(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("removeUser")
  remove(@Args("id") id: number) {
    return this.userService.remove(id);
  }
}
