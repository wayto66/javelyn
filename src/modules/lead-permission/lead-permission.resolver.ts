import { UseGuards } from "@nestjs/common";
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import {
  CreateleadPermissionInput,
  CreateleadPermissionsInput,
  FiltersInput,
  UpdateleadPermissionInput,
} from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { LeadPermissionService } from "./lead-permission.service";

@Resolver("leadPermission")
export class leadPermissionResolver {
  constructor(private readonly leadPermissionService: LeadPermissionService) {}

  @UseGuards(AuthGuard)
  @Mutation("createLeadPermission")
  create(
    @Args("createLeadPermissionInput")
    createLeadPermissionInput: CreateleadPermissionInput,
  ) {
    return this.leadPermissionService.create(createLeadPermissionInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("createLeadPermissions")
  createMany(
    @Args("createLeadPermissionsInput")
    createLeadPermissionsInput: CreateleadPermissionsInput,
  ) {
    return this.leadPermissionService.createMany(createLeadPermissionsInput);
  }

  @UseGuards(AuthGuard)
  @Query("leadPermissions")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.leadPermissionService.findAll(info, page, pageSize, filters);
  }

  @UseGuards(AuthGuard)
  @Query("leadPermission")
  findOne(@Args("id") id: number, @Info() info: GraphQLResolveInfo) {
    return this.leadPermissionService.findOne(info, id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateLeadPermission")
  update(
    @Args("updateLeadPermissionInput")
    updateLeadPermissionInput: UpdateleadPermissionInput,
  ) {
    return this.leadPermissionService.update(
      updateLeadPermissionInput.id,
      updateLeadPermissionInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeLeadPermission")
  remove(@Args("id") id: number) {
    return this.leadPermissionService.remove(id);
  }
}
