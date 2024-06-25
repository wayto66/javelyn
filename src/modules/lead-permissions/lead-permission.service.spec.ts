import { Test, TestingModule } from "@nestjs/testing";
import { leadPermissionService } from "./leadPermission-permission.service";

describe("leadPermissionService", () => {
  let service: leadPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [leadPermissionService],
    }).compile();

    service = module.get<leadPermissionService>(leadPermissionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
