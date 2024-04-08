import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CreateCategoryInput,
  FiltersInput,
  UpdateCategoryInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { CategoryService } from "./category.service";

@Resolver("Category")
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Mutation("createCategory")
  create(
    @Args("createCategoryInput") createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query("categories")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
  ) {
    return this.categoryService.findAll(page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("category")
  findOne(@Args("id") id: number) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateCategory")
  update(
    @Args("updateCategoryInput") updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeCategory")
  remove(@Args("id") id: number) {
    return this.categoryService.remove(id);
  }
}
