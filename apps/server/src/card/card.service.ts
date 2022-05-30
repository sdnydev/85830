import { CreateCardDto, UpdateCardDto } from '@85830/common-kit';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCard(data: CreateCardDto) {
    const { boatId, swimlaneId } = data;

    const boatExists = await this.prismaService.boat.findFirst({ where: { id: boatId } });
    if (!boatExists) throw new BadRequestException('Boat does not exist');

    const swimlaneExists = await this.prismaService.swimlane.findFirst({ where: { id: swimlaneId } });
    if (!swimlaneExists) throw new BadRequestException('Swimlane does not exist');

    const boatPreviouslyAssignedToCard = await this.prismaService.card.findFirst({ where: { boatId: boatId } });
    if (boatPreviouslyAssignedToCard) throw new BadRequestException('Boat already assigned to card');

    return await this.prismaService.card.create({
      data: data,
    });
  }

  async getCards() {
    return await this.prismaService.card.findMany();
  }

  async updateCard(id: string, data: UpdateCardDto) {
    const { swimlaneId } = data;

    const cardExists = await this.prismaService.card.findFirst({ where: { id: id } });
    if (!cardExists) throw new NotFoundException();

    const swimlaneExists = await this.prismaService.swimlane.findFirst({ where: { id: swimlaneId } });
    if (!swimlaneExists) throw new BadRequestException('Swimlane does not exist');

    return await this.prismaService.card.update({ where: { id: id }, data: data });
  }

  async deleteCard(id: string) {
    try {
      await this.prismaService.card.delete({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException();
    }

    return;
  }
}
