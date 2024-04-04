import { Test, TestingModule } from '@nestjs/testing';
import { ThrowService } from './throw.service';

describe('ThrowService', () => {
  let service: ThrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThrowService],
    }).compile();

    service = module.get<ThrowService>(ThrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
