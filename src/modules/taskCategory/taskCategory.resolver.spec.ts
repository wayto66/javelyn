import { Test, TestingModule } from "@nestjs/testing";
import { TaskCategoryResolver } from "./taskCategory.resolver";
import { TaskCategoryService } from "./taskCategory.service";

describe("TaskCategoryResolver", () => {
  let resolver: TaskCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCategoryResolver, TaskCategoryService],
    }).compile();

    resolver = module.get<TaskCategoryResolver>(TaskCategoryResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
