import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CreateTicketProductInput,
  UpdateTicketProductInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { TicketProductService } from "./ticketProduct.service";

@Resolver("TicketProduct")
export class TicketProductResolver {
  constructor(private readonly ticketProductService: TicketProductService) {}

  @UseGuards(AuthGuard)
  @Mutation("createTicketProduct")
  create(
    @Args("createTicketProductInput")
    createTicketProductInput: CreateTicketProductInput,
  ) {
    return this.ticketProductService.create(createTicketProductInput);
  }

  @UseGuards(AuthGuard)
  @Query("ticketProduct")
  findAll() {
    return this.ticketProductService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query("ticketProduct")
  findOne(@Args("id") id: number) {
    return this.ticketProductService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateTicketProduct")
  update(
    @Args("updateTicketProductInput")
    updateTicketProductInput: UpdateTicketProductInput,
  ) {
    return this.ticketProductService.update(
      updateTicketProductInput.id,
      updateTicketProductInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeTicketProduct")
  remove(@Args("id") id: number) {
    return this.ticketProductService.remove(id);
  }
}
