import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Injectable()
export class BoatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBoats() {
    const assigned = (await this.prismaService.card.findMany({ select: { boatId: true } })).map(boat => boat.boatId);

    return await this.prismaService.boat.findMany({ where: { id: { not: { in: assigned } } } });
  }
}
