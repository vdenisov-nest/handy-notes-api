import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as jwt from 'jsonwebtoken';

import { UserEntity } from '../user/user.entity';
import { RegisterUserDTO, LoginUserDTO } from './auth.dto';

enum AuthAction {
  REGISTER = 'regiter',
  LOGIN = 'login',
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private async _verifyUserEmail(email: string, action?: string) {
    const userObj = await this.userRepository.findOne({ where: {email} });

    if ( (action === AuthAction.LOGIN) && (typeof userObj === 'undefined') ) {
      throw new BadRequestException('Email not found !!!');
    } else if ( (action === AuthAction.REGISTER) && (typeof userObj !== 'undefined') ) {
      throw new BadRequestException('User already exists !!!');
    } else {
      return userObj;
    }
  }

  // ==================================================

  async register(data: RegisterUserDTO): Promise<any> {
    const { email, password } = data;
    // validation
    await this._verifyUserEmail(email, AuthAction.REGISTER);

    const userObj = await this.userRepository.create(data);
    await this.userRepository.save(userObj);

    return jwt.sign(
      { id: userObj.id, email: userObj.email },
      'default-secret',
      { expiresIn: '7d' },
    );
  }

  async login(data: LoginUserDTO): Promise<any> {
    const { email, password } = data;
    // validation
    await this._verifyUserEmail(email, AuthAction.LOGIN);

    const userObj = await this.userRepository.findOne({
      where: {email},
    });
    const isPasswordsMatch = await userObj.comparePassword(password);
    if (!isPasswordsMatch) {
      throw new BadRequestException('Invalid email or password !!!');
    }

    return jwt.sign(
      { id: userObj.id, email: userObj.email },
      'default-secret',
      { expiresIn: '7d' },
    );
  }

}
