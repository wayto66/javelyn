import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import {
  CreateTicketInput,
  FiltersInput,
  UpdateTicketInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { TicketService } from "./ticket.service";

@Resolver("Ticket")
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Mutation("createTicket")
  create(@Args("createTicketInput") createTicketInput: CreateTicketInput) {
    return this.ticketService.create(createTicketInput);
  }

  @UseGuards(AuthGuard)
  @Query("tickets")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.ticketService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("ticket")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.ticketService.findOne(info, id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateTicket")
  update(
    @Args("updateTicketInput") updateTicketInput: UpdateTicketInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.ticketService.update(
      info,
      updateTicketInput.id,
      updateTicketInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeTicket")
  remove(@Args("id") id: number) {
    return this.ticketService.remove(id);
  }
}
