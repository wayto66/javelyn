import { Test, TestingModule } from '@nestjs/testing';
import { ThrowResolver } from './throw.resolver';
import { ThrowService } from './throw.service';

describe('ThrowResolver', () => {
  let resolver: ThrowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThrowResolver, ThrowService],
    }).compile();

    resolver = module.get<ThrowResolver>(ThrowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
