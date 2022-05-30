import { CreateCardDto, UpdateCardDto } from '@85830/common-kit';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CardService } from '../../../card/card.service';

@Controller({
  path: 'cards',
  version: '1',
})
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async createCard(@Body() data: CreateCardDto) {
    return await this.cardService.createCard(data);
  }

  @Get()
  async getCards() {
    return await this.cardService.getCards();
  }

  @Patch(':id')
  async updateCard(@Param('id') id: string, @Body() data: UpdateCardDto) {
    return this.cardService.updateCard(id, data);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }
}
