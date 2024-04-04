import { Test, TestingModule } from '@nestjs/testing';
import { LeadResolver } from './lead.resolver';
import { LeadService } from './lead.service';

describe('LeadResolver', () => {
  let resolver: LeadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadResolver, LeadService],
    }).compile();

    resolver = module.get<LeadResolver>(LeadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
