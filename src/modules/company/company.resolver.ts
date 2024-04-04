import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateCompanyInput, UpdateCompanyInput } from "src/graphql";
import { AuthGuard } from "src/infra/common/guard/auth.guard";
import { CompanyService } from "./company.service";

@Resolver("Company")
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Mutation("createCompany")
  create(@Args("createCompanyInput") createCompanyInput: CreateCompanyInput) {
    return this.companyService.create(createCompanyInput);
  }

  @UseGuards(AuthGuard)
  @Query("companies")
  findAll() {
    return this.companyService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query("company")
  findOne(@Args("id") id: number) {
    return this.companyService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation("updateCompany")
  update(@Args("updateCompanyInput") updateCompanyInput: UpdateCompanyInput) {
    return this.companyService.update(
      updateCompanyInput.id,
      updateCompanyInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation("removeCompany")
  remove(@Args("id") id: number) {
    return this.companyService.remove(id);
  }
}
