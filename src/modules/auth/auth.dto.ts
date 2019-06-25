import { IsString, IsOptional, IsDate, IsPhoneNumber, IsEmail } from 'class-validator';

// tslint:disable:max-classes-per-file

export class RegisterUserDTO {
  // @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  // @IsPhoneNumber('RU')
  @IsString()
  @IsOptional()
  phone: string;

  // @IsDate()
  @IsString()
  @IsOptional()
  birthdate: string;
}

export class LoginUserDTO {
  // @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
