import { IsString, IsDate, IsOptional } from 'class-validator';

// tslint:disable:max-classes-per-file

export class CreateUserDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsDate()
  @IsOptional()
  birthdate: Date;
}
