import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { CreateQuoteInput, FiltersInput, UpdateQuoteInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { QuoteService } from "./quote.service";

@Resolver("Quote")
export class QuoteResolver {
  constructor(private readonly quoteService: QuoteService) {}

  @UseGuards(AuthGuard)
  @Mutation("createQuote")
  create(@Args("createQuoteInput") createQuoteInput: CreateQuoteInput) {
    return this.quoteService.create(createQuoteInput);
  }

  @UseGuards(AuthGuard)
  @Query("quotes")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.quoteService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("quote")
  findOne(@Args("id") id: number) {
    return this.quoteService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateQuote")
  update(
    @Args("updateQuoteInput") updateQuoteInput: UpdateQuoteInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.quoteService.update(
      info,
      updateQuoteInput.id,
      updateQuoteInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeQuote")
  remove(@Args("id") id: number) {
    return this.quoteService.remove(id);
  }
}
