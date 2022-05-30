import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { Logger } from 'nestjs-pino';
import passport from 'passport';
import createFileStore from 'session-file-store';
import { AppModule } from './app.module';
import { Environment } from './common/dtos/environment.dto';
import { PrismaService } from './common/services/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService: ConfigService<Environment, true> = app.get(ConfigService);

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Configure session
  const FileStore = createFileStore(session);
  app.use(
    session({
      store: new FileStore({ secret: configService.get('SESSION_SECRET'), path: './.sessions' }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });

  await app.listen(configService.get('SERVER_PORT'), configService.get('SERVER_HOST'));
}
void bootstrap();
