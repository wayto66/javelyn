import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRoleInput, UpdateRoleInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { RoleService } from "./role.service";

@Resolver("Role")
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard)
  @Mutation("createRole")
  create(@Args("createRoleInput") createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @UseGuards(AuthGuard)
  @Query("role")
  findAll() {
    return this.roleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query("role")
  findOne(@Args("id") id: number) {
    return this.roleService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateRole")
  update(@Args("updateRoleInput") updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput.id, updateRoleInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("removeRole")
  remove(@Args("id") id: number) {
    return this.roleService.remove(id);
  }
}
