import { Test, TestingModule } from '@nestjs/testing';
import { LeadStatusService } from './lead-status.service';

describe('LeadStatusService', () => {
  let service: LeadStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadStatusService],
    }).compile();

    service = module.get<LeadStatusService>(LeadStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
