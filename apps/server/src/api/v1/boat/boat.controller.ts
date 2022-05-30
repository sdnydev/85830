import { Controller, Get } from '@nestjs/common';
import { BoatService } from '../../../boat/boat.service';

@Controller({
  path: 'boats',
  version: '1',
})
export class BoatController {
  constructor(private readonly boatService: BoatService) {}

  @Get()
  async getBoats() {
    return await this.boatService.getBoats();
  }
}
