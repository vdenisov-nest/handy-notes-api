import { IsString, IsOptional, IsNumber } from 'class-validator';

// tslint:disable:max-classes-per-file

export class CreateNoteDTO {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsNumber()
  userId: number;
}

export class UpdateNoteDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  text: string;
}
