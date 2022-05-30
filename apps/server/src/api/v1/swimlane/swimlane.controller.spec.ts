import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { SwimlaneService } from '../../../swimlane/swimlane.service';
import { SwimlaneController } from './swimlane.controller';

describe('SwimlaneController', () => {
  let controller: SwimlaneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, SwimlaneService],
      controllers: [SwimlaneController],
    }).compile();

    controller = module.get<SwimlaneController>(SwimlaneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
