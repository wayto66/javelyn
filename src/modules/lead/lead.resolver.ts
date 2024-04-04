import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import {
  CreateLeadInput,
  CreateLeadsInput,
  FiltersInput,
  UpdateLeadInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { LeadService } from "./lead.service";

@Resolver("Lead")
export class LeadResolver {
  constructor(private readonly leadService: LeadService) {}

  @UseGuards(AuthGuard)
  @Mutation("createLead")
  create(@Args("createLeadInput") createLeadInput: CreateLeadInput) {
    return this.leadService.create(createLeadInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("createLeads")
  createMany(@Args("createLeadsInput") createLeadsInput: CreateLeadsInput) {
    return this.leadService.createMany(createLeadsInput);
  }

  @UseGuards(AuthGuard)
  @Query("leads")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.leadService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("lead")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.leadService.findOne(info, id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateLead")
  update(@Args("updateLeadInput") updateLeadInput: UpdateLeadInput) {
    return this.leadService.update(updateLeadInput.id, updateLeadInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("removeLead")
  remove(@Args("id") id: number) {
    return this.leadService.remove(id);
  }
}
