import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTagInput, FiltersInput, UpdateTagInput } from "src/graphql";
import { TagService } from "./tag.service";

@Resolver("Tag")
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation("createTag")
  create(@Args("createTagInput") createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query("tags")
  findAll(
    @Args("page") page: number,
    @Args("pageSize") pageSize: number,
    @Args("filters") filters: FiltersInput,
  ) {
    return this.tagService.findAll(page, pageSize, filters);
  }

  @Query("tag")
  findOne(@Args("id") id: number, @Info() info) {
    return this.tagService.findOne(id, info);
  }

  @Mutation("updateTag")
  update(@Args("updateTagInput") updateTagInput: UpdateTagInput) {
    return this.tagService.update(updateTagInput.id, updateTagInput);
  }

  @Mutation("removeTag")
  remove(@Args("id") id: number) {
    return this.tagService.remove(id);
  }
}
