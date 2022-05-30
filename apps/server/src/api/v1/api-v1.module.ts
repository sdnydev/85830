import { Module } from '@nestjs/common';
import { AuthenticationService } from '../../authentication/authentication.service';
import { BoatService } from '../../boat/boat.service';
import { CardService } from '../../card/card.service';
import { PrismaService } from '../../common/services/prisma/prisma.service';
import { SwimlaneService } from '../../swimlane/swimlane.service';
import { UserService } from '../../user/user.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { BoatController } from './boat/boat.controller';
import { CardController } from './card/card.controller';
import { SwimlaneController } from './swimlane/swimlane.controller';

@Module({
  controllers: [AuthenticationController, BoatController, CardController, SwimlaneController],
  providers: [AuthenticationService, BoatService, CardService, PrismaService, SwimlaneService, UserService],
})
export class ApiV1Module {}
