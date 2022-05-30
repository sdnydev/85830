import { IsArray, IsString } from 'class-validator';

export class UpdateSwimlanesDto {
  @IsString()
  id!: string;

  @IsArray({ each: true })
  cards!: string[];
}
