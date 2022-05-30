import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { BoatService } from './boat.service';

@Module({
  providers: [BoatService, PrismaService],
})
export class BoatModule {}
