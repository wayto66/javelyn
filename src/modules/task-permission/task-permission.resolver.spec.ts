import { Test, TestingModule } from "@nestjs/testing";
import { taskPermissionResolver } from "./task-permission.resolver";
import { TaskPermissionService } from "./task-permission.service";

describe("taskPermissionResolver", () => {
  let resolver: taskPermissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [taskPermissionResolver, TaskPermissionService],
    }).compile();

    resolver = module.get<taskPermissionResolver>(taskPermissionResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
