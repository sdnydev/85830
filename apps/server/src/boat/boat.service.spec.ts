import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { BoatService } from './boat.service';

describe('BoatService', () => {
  let service: BoatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoatService, PrismaService],
    }).compile();

    service = module.get<BoatService>(BoatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
