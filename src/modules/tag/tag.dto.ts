import { IsString, IsOptional } from 'class-validator';

// tslint:disable:max-classes-per-file

export class CreateTagDTO {
  @IsString()
  value: string;
}

export class UpdateTagDTO {
  @IsString()
  @IsOptional()
  value: string;
}
