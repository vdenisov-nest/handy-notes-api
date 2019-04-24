import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDTO, UpdateTagDTO } from './tag.dto';

import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  private async _checkNoteId(id: number) {
    const tagObj = await this.tagRepository.findOne({ where: {id} });
    if (!tagObj) {
      throw new NotFoundException(`Not found record with (id='${id}') !!!`);
    }
    return tagObj;
  }

  // ==================================================
  // CRUD

  async createNew(data: CreateTagDTO): Promise<any> {
    const tagObj = await this.tagRepository.create(data);
    await this.tagRepository.save(tagObj);

    return tagObj;
  }

  async showAll(): Promise<any[]> {
    const tagList = this.tagRepository.find({
      relations: ['notes'],
    });

    return tagList;
  }

  async findOne(id: number): Promise<any> {
    // validation
    await this._checkNoteId(id);

    const tagObj = await this.tagRepository.findOne({
      where: {id},
      relations: ['notes'],
    });

    return tagObj;
  }

  async updateOne(id: number, data: UpdateTagDTO): Promise<any> {
    // validation
    await this._checkNoteId(id);

    await this.tagRepository.update({id}, data);
    const tagObj = await this.tagRepository.findOne({
      where: {id},
      relations: ['notes'],
    });

    return tagObj;
  }

  async deleteOne(id: number): Promise<any> {
    await this._checkNoteId(id);

    const tagObj = await this.tagRepository.findOne({
      where: {id},
      relations: ['notes'],
    });
    await this.tagRepository.delete({ id });

    return tagObj;
  }

  // ==================================================

}
