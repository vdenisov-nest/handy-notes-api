import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private async _getByIdOrFail(id: number) {
    const userObj = await this.userRepository.findOne({ where: {id} });
    if (!userObj) {
      throw new NotFoundException(`Not found record with (id='${id}')`);
    }
    return userObj;
  }

  private async _getByEmailOrFail(email: string) {
    const userObj = await this.userRepository.findOne({ where: {email} });
    if (!userObj) {
      throw new BadRequestException('User already exists !');
    }
    return userObj;
  }

  // ==================================================

  async createNew(data: CreateUserDTO): Promise<any> {
    const { email, password } = data;
    let userObj = await this._getByEmailOrFail(email);
    userObj = await this.userRepository.create(data);
    await this.userRepository.save(userObj);

    return userObj;
  }

  // ==================================================

  async showAll(): Promise<any[]> {
    const userList = await this.userRepository.find();

    return userList;
  }

  // ==================================================

  async findOne(id: number): Promise<any> {
    const userObj = await this._getByIdOrFail(id);

    return userObj;
  }

  // ==================================================

  async updateOne(id: number, data: UpdateUserDTO): Promise<any> {
    let userObj = await this._getByIdOrFail(id);
    await this.userRepository.update({id}, data);
    userObj = await this._getByIdOrFail(id);

    return userObj;
  }

  // ==================================================

  async deleteOne(id: number): Promise<any> {
    const userObj = await this._getByIdOrFail(id);
    await this.userRepository.delete({ id });

    return userObj;
  }
}
