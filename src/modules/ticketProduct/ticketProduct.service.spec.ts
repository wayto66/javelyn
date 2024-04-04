import { Test, TestingModule } from "@nestjs/testing";
import { TicketProductService } from "./TicketProduct.service";

describe("TicketProductService", () => {
  let service: TicketProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketProductService],
    }).compile();

    service = module.get<TicketProductService>(TicketProductService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
