import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { CardService } from './card.service';

@Module({
  providers: [CardService, PrismaService],
})
export class CardModule {}
