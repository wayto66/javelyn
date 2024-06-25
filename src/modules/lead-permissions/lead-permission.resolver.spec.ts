import { Test, TestingModule } from "@nestjs/testing";
import { leadPermissionResolver } from "./lead-permission.resolver";
import { LeadPermissionService } from "./lead-permission.service";

describe("leadPermissionResolver", () => {
  let resolver: leadPermissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [leadPermissionResolver, LeadPermissionService],
    }).compile();

    resolver = module.get<leadPermissionResolver>(leadPermissionResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
