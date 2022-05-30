import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from '../../../card/card.service';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import { CardController } from './card.controller';

describe('CardController', () => {
  let controller: CardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService, PrismaService],
      controllers: [CardController],
    }).compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
