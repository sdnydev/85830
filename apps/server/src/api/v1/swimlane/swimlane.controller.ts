import { UpdateSwimlanesDto } from '@85830/common-kit';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SwimlaneService } from '../../../swimlane/swimlane.service';

@Controller({
  path: 'swimlanes',
  version: '1',
})
export class SwimlaneController {
  constructor(private readonly swimlaneService: SwimlaneService) {}

  @Get()
  async getSwimlanes() {
    return await this.swimlaneService.getSwimlanes();
  }

  @Patch()
  async updateSwimlanes(@Body() data: UpdateSwimlanesDto[]) {
    return await this.swimlaneService.updateSwimlanes(data);
  }
}
