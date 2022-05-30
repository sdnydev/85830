import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { SwimlaneService } from './swimlane.service';

@Module({
  providers: [PrismaService, SwimlaneService],
})
export class SwimlaneModule {}
