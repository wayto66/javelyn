import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { FiltersInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { CreateLeadStatusInput } from "./dto/create-lead-status.input";
import { UpdateLeadStatusInput } from "./dto/update-lead-status.input";
import { LeadStatusService } from "./lead-status.service";

@Resolver("LeadStatus")
export class LeadStatusResolver {
  constructor(private readonly leadStatusService: LeadStatusService) {}

  @UseGuards(AuthGuard)
  @Mutation("createLeadStatus")
  create(
    @Args("createLeadStatusInput") createLeadStatusInput: CreateLeadStatusInput,
  ) {
    return this.leadStatusService.create(createLeadStatusInput);
  }

  @UseGuards(AuthGuard)
  @Query("allLeadStatus")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.leadStatusService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("leadStatus")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.leadStatusService.findOne(info, id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateLeadStatus")
  update(
    @Args("updateLeadStatusInput") updateLeadStatusInput: UpdateLeadStatusInput,
  ) {
    return this.leadStatusService.update(
      updateLeadStatusInput.id,
      updateLeadStatusInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeLeadStatus")
  remove(@Args("id") id: number) {
    return this.leadStatusService.remove(id);
  }
}
