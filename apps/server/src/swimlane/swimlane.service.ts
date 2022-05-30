import { UpdateSwimlanesDto } from '@85830/common-kit';
import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Injectable()
export class SwimlaneService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSwimlanes() {
    return await this.prismaService.swimlane.findMany({
      select: {
        id: true,
        name: true,
        position: true,
        cards: {
          select: {
            id: true,
            boat: true,
          },
        },
      },
    });
  }

  async updateSwimlanes(@Body() data: UpdateSwimlanesDto[]) {
    for (const d of data) {
      for (const cardId of d.cards) {
        await this.prismaService.card.update({
          where: { id: cardId },
          data: {
            swimlaneId: d.id,
          },
        });
      }
    }

    return this.getSwimlanes();
  }
}
