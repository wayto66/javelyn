import { Test, TestingModule } from "@nestjs/testing";
import { TicketProductResolver } from "./TicketProduct.resolver";
import { TicketProductService } from "./TicketProduct.service";

describe("TicketProductResolver", () => {
  let resolver: TicketProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketProductResolver, TicketProductService],
    }).compile();

    resolver = module.get<TicketProductResolver>(TicketProductResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
