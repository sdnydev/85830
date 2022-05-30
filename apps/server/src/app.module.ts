import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { LoggerModule } from 'nestjs-pino';
import { ApiV1Module } from './api/v1/api-v1.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { BoatModule } from './boat/boat.module';
import { CardModule } from './card/card.module';
import { Environment } from './common/dtos/environment.dto';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PrismaService } from './common/services/prisma/prisma.service';
import { SwimlaneModule } from './swimlane/swimlane.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        const environment = plainToClass(Environment, config, { enableImplicitConversion: true });
        const errors = validateSync(environment, { stopAtFirstError: true, whitelist: true });
        if (errors.length > 0) {
          throw errors[0];
        }

        return environment;
      },
    }),
    ApiV1Module,
    AuthenticationModule,
    BoatModule,
    CardModule,
    SwimlaneModule,
    UserModule,
  ],
  exports: [PrismaService],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    PrismaService,
  ],
})
export class AppModule {}
