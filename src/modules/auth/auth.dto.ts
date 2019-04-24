import { IsString, IsDate, IsOptional, IsPhoneNumber, IsEmail } from 'class-validator';

// tslint:disable:max-classes-per-file

export class RegisterUserDTO {
  // AUTH credetials {
  // @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  // } AUTH credetials

  // PROFILE info {
  @IsString()
  @IsOptional()
  name: string;

  // @IsString()
  @IsPhoneNumber('RU')
  @IsOptional()
  phone: string;

  @IsDate()
  @IsOptional()
  birthdate: Date;
  // } PROFILE info
}

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
