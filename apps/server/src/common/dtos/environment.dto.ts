import { IsIP, IsNumber, IsString, MinLength } from 'class-validator';

export class Environment {
  @IsString()
  POSTGRES_DB!: string;

  @IsString()
  POSTGRES_USER!: string;

  @IsString()
  POSTGRES_PASSWORD!: string;

  @IsIP(4)
  POSTGRES_HOST!: string;

  @IsNumber()
  POSTGRES_PORT!: number;

  @IsString()
  DATABASE_URL!: string;

  @IsIP(4)
  SERVER_HOST!: string;

  @IsNumber()
  SERVER_PORT!: number;

  @IsString()
  @MinLength(32)
  SESSION_SECRET!: string;
}
