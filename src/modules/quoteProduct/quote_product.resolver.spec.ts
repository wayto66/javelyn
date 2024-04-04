import { Test, TestingModule } from "@nestjs/testing";
import { QuoteProductResolver } from "./QuoteProduct.resolver";
import { QuoteProductService } from "./QuoteProduct.service";

describe("QuoteProductResolver", () => {
  let resolver: QuoteProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteProductResolver, QuoteProductService],
    }).compile();

    resolver = module.get<QuoteProductResolver>(QuoteProductResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
