import { LoginDto } from '@85830/common-kit';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UserService) {}

  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.prismaService.user.findUnique({ where: { email: email } });
    if (!user) throw new UnauthorizedException();

    const match = await compare(password, user.password);
    if (!match) throw new UnauthorizedException();

    return this.userService.findById(user.id);
  }
}
