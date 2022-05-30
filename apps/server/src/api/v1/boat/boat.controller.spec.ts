import { Test, TestingModule } from '@nestjs/testing';
import { BoatService } from '../../../boat/boat.service';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { BoatController } from './boat.controller';

describe('BoatController', () => {
  let controller: BoatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoatService, PrismaService],
      controllers: [BoatController],
    }).compile();

    controller = module.get<BoatController>(BoatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
