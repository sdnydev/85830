import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { SwimlaneService } from './swimlane.service';

describe('SwimlaneService', () => {
  let service: SwimlaneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, SwimlaneService],
    }).compile();

    service = module.get<SwimlaneService>(SwimlaneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
