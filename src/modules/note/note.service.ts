import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { NoteEntity } from './note.entity';
import { CreateNoteDTO, UpdateNoteDTO } from './note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
  ) {}

  private async _getByIdOrFail(id: number) {
    const noteObj = await this.noteRepository.findOne({
      where: {id},
      relations: ['author'],
    });
    if (!noteObj) {
      throw new NotFoundException(`Not found record with (id='${id}')`);
    }
    return noteObj;
  }

  private async _verifyUserId(id: number) {
    const userObj = await this.userRepository.findOne({
      where: {id},
    });
    if (!userObj) {
      throw new NotFoundException(`Not found record with (id='${id}')`);
    }
    return userObj;
  }

  // ==================================================
  // CRUD

  async createNew(data: CreateNoteDTO): Promise<any> {
    const { title, text, userId } = data;
    const userObj = await this._verifyUserId(userId);

    const noteObj = await this.noteRepository.create({
      title,
      text,
      author: userObj,
    });
    await this.noteRepository.save(noteObj);

    return noteObj;
  }

  async showAll(): Promise<any[]> {
    const noteList = this.noteRepository.find({
      relations: ['author'],
    });

    return noteList;
  }

  async findOne(id: number): Promise<any> {
    const noteObj = await this._getByIdOrFail(id);

    return noteObj;
  }

  async updateOne(id: number, data: UpdateNoteDTO): Promise<any> {
    let noteObj = await this._getByIdOrFail(id);
    await this.noteRepository.update({id}, data);
    noteObj = await this._getByIdOrFail(id);

    return noteObj;
  }

  async deleteOne(id: number): Promise<any> {
    const noteObj = await this._getByIdOrFail(id);
    await this.noteRepository.delete({ id });

    return noteObj;
  }

  // ==================================================

}
