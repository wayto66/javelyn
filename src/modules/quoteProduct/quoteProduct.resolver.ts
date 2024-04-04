import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateQuoteProductInput, UpdateQuoteProductInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { QuoteProductService } from "./quoteProduct.service";

@Resolver("QuoteProduct")
export class QuoteProductResolver {
  constructor(private readonly quoteProductService: QuoteProductService) {}

  @UseGuards(AuthGuard)
  @Mutation("createQuoteProduct")
  create(
    @Args("createQuoteProductInput")
    createQuoteProductInput: CreateQuoteProductInput,
  ) {
    return this.quoteProductService.create(createQuoteProductInput);
  }

  @UseGuards(AuthGuard)
  @Query("quoteProduct")
  findAll() {
    return this.quoteProductService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query("quoteProduct")
  findOne(@Args("id") id: number) {
    return this.quoteProductService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateQuoteProduct")
  update(
    @Args("updateQuoteProductInput")
    updateQuoteProductInput: UpdateQuoteProductInput,
  ) {
    return this.quoteProductService.update(
      updateQuoteProductInput.id,
      updateQuoteProductInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeQuoteProduct")
  remove(@Args("id") id: number) {
    return this.quoteProductService.remove(id);
  }
}
