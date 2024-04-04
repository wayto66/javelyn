import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateThrowInput, UpdateThrowInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { ThrowService } from "./throw.service";

@Resolver("Throw")
export class ThrowResolver {
  constructor(private readonly throwService: ThrowService) {}

  @UseGuards(AuthGuard)
  @Mutation("createThrow")
  create(@Args("createThrowInput") createThrowInput: CreateThrowInput) {
    return this.throwService.create(createThrowInput);
  }

  @UseGuards(AuthGuard)
  @Query("throw")
  findAll() {
    return this.throwService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query("throw")
  findOne(@Args("id") id: number) {
    return this.throwService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateThrow")
  update(@Args("updateThrowInput") updateThrowInput: UpdateThrowInput) {
    return this.throwService.update(updateThrowInput.id, updateThrowInput);
  }

  @UseGuards(AuthGuard)
  @Mutation("removeThrow")
  remove(@Args("id") id: number) {
    return this.throwService.remove(id);
  }
}
