import { Test, TestingModule } from "@nestjs/testing";
import { QuoteProductService } from "./QuoteProduct.service";

describe("QuoteProductService", () => {
  let service: QuoteProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteProductService],
    }).compile();

    service = module.get<QuoteProductService>(QuoteProductService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
