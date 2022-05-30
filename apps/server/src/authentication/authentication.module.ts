import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service';
import { LocalSerializer } from './serializers/local.serializer';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthenticationService, LocalSerializer, LocalStrategy, PrismaService, UserService],
})
export class AuthenticationModule {}
