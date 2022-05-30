import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      select: { id: true, email: true, name: true },
      where: { id: id },
    });
    if (!user) throw new NotFoundException();

    return user;
  }
}
