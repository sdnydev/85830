import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // Check Email and Password
    const result = (await super.canActivate(context)) as boolean;

    // Init session
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    return result;
  }
}
