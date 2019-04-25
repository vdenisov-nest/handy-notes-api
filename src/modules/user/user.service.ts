import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';

import { UserEntity } from 'src/shared/models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private async _verifyUserId(id: number) {
    const userObj = await this.userRepository.findOne({ where: {id} });
    if (!userObj) {
      throw new NotFoundException(`Not found record with (id='${id}') !!!`);
    }
    return userObj;
  }

  private async _verifyUserEmail(email: string) {
    const userObj = await this.userRepository.findOne({ where: {email} });
    if (userObj) {
      throw new BadRequestException('User already exists !!!');
    }
    return userObj;
  }

  // ==================================================
  // CRUD

  async createNew(data: CreateUserDTO): Promise<any> {
    const { email, password } = data;
    // validation
    await this._verifyUserEmail(email);

    const userObj = await this.userRepository.create(data);
    await this.userRepository.save(userObj);

    return userObj;
  }

  async showAll(): Promise<any> {
    const userList = await this.userRepository.find({
      relations: ['personalNotes'],
    });

    return {
      data: userList,
      total: userList.length,
    };
  }

  async findOne(id: number): Promise<any> {
    // validation
    await this._verifyUserId(id);

    const userObj = await this.userRepository.findOne({
      where: {id},
      relations: ['personalNotes'],
    });

    return {
      data: userObj,
    };
  }

  async updateOne(id: number, data: UpdateUserDTO): Promise<any> {
    // validation
    await this._verifyUserId(id);

    await this.userRepository.update({id}, data);
    const userObj = await this.userRepository.findOne({
      where: {id},
      relations: ['personalNotes'],
    });

    return {
      data: userObj,
    };
  }

  async deleteOne(id: number): Promise<any> {
    // validation
    await this._verifyUserId(id);

    const userObj = await this.userRepository.findOne({
      where: {id},
      relations: ['personalNotes'],
    });
    await this.userRepository.delete({ id });

    return {
      message: 'user is deleted !',
    };
  }

  // ==================================================
  // Notes

  async showPersonalNotes(id: number): Promise<any> {
    // validation
    await this._verifyUserId(id);

    const userObj = await this.userRepository.findOne({
      where: {id},
      relations: ['personalNotes'],
    });

    return userObj.personalNotes;
  }

  async showFavoriteNotes(id: number): Promise<any> {
    // validation
    await this._verifyUserId(id);

    const userObj = await this.userRepository.findOne({
      where: {id},
      relations: ['favoriteNotes'],
    });

    return userObj.favoriteNotes;
  }

  // ==================================================

}
