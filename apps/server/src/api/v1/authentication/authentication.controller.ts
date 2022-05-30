import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PublicRoute } from '../../../authentication/decorators/public-route.decorator';
import { LoginGuard } from '../../../authentication/guards/login.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthenticationController {
  @Post('login')
  @PublicRoute()
  @UseGuards(LoginGuard)
  @HttpCode(200)
  login(@Req() req: Request) {
    return this.getProfile(req);
  }

  @Get('profile')
  getProfile(@Req() request: Request) {
    return request.user;
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: Request) {
    req.logOut();
    req.session.cookie.maxAge = 0;
  }
}
