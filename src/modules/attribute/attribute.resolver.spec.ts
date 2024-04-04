import { Test, TestingModule } from "@nestjs/testing";
import { AttributeResolver } from "./attribute.resolver";
import { AttributeService } from "./attribute.service";

describe("AttributeResolver", () => {
  let resolver: AttributeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeResolver, AttributeService],
    }).compile();

    resolver = module.get<AttributeResolver>(AttributeResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
