import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CreateAttributeInput,
  FiltersInput,
  UpdateAttributeInput,
} from "src/graphql";
import { AttributeService } from "./attribute.service";

@Resolver("Attribute")
export class AttributeResolver {
  constructor(private readonly attributeService: AttributeService) {}

  @Mutation("createAttribute")
  create(
    @Args("createAttributeInput") createAttributeInput: CreateAttributeInput,
  ) {
    return this.attributeService.create(createAttributeInput);
  }

  @Query("attributes")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
  ) {
    return this.attributeService.findAll(page, pageSize, filters);
  }

  @Query("attribute")
  findOne(@Args("id") id: number, @Info() info) {
    return this.attributeService.findOne(id, info);
  }

  @Mutation("updateAttribute")
  update(
    @Args("updateAttributeInput") updateAttributeInput: UpdateAttributeInput,
  ) {
    return this.attributeService.update(
      updateAttributeInput.id,
      updateAttributeInput,
    );
  }

  @Mutation("removeAttribute")
  remove(@Args("id") id: number) {
    return this.attributeService.remove(id);
  }
}
