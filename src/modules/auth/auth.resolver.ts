import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SignInInput } from "src/graphql";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation("signIn")
  create(@Args("signInInput") signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
