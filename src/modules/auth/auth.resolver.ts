import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SignInInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Mutation("signIn")
  create(@Args("signInInput") signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
