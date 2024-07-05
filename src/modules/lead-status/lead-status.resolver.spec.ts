import { Test, TestingModule } from "@nestjs/testing";
import { LeadStatusResolver } from "./lead-status.resolver";
import { LeadStatusService } from "./lead-status.service";

describe("LeadStatusResolver", () => {
  let resolver: LeadStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadStatusResolver, LeadStatusService],
    }).compile();

    resolver = module.get<LeadStatusResolver>(LeadStatusResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
