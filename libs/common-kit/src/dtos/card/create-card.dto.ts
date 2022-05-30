import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  boatId!: string;

  @IsString()
  @IsNotEmpty()
  swimlaneId!: string;
}
