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
  username: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsDate()
  @IsOptional()
  birthdate: Date;
}
