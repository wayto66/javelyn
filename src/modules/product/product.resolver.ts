import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import {
  CreateProductInput,
  FiltersInput,
  UpdateProductInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { ProductService } from "./product.service";

@Resolver("Product")
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation("createProduct")
  create(@Args("createProductInput") createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query("products")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.productService.findAll(info, page, pageSize, filters);
  }

  @Query("product")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.productService.findOne(id, info);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateProduct")
  update(@Args("updateProductInput") updateProductInput: UpdateProductInput) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeProduct")
  remove(@Args("id") id: number) {
    return this.productService.remove(id);
  }
}
