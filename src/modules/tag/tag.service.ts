import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TagEntity } from './tag.entity';
import { CreateTagDTO, UpdateTagDTO } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  private async _getByIdOrFail(id: number) {
    const tagObj = await this.tagRepository.findOne({ where: {id} });
    if (!tagObj) {
      throw new NotFoundException(`Not found record with (id='${id}')`);
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
    const tagList = this.tagRepository.find();

    return tagList;
  }

  async findOne(id: number): Promise<any> {
    const tagObj = await this._getByIdOrFail(id);

    return tagObj;
  }

  async updateOne(id: number, data: UpdateTagDTO): Promise<any> {
    let tagObj = await this._getByIdOrFail(id);
    await this.tagRepository.update({id}, data);
    tagObj = await this._getByIdOrFail(id);

    return tagObj;
  }

  async deleteOne(id: number): Promise<any> {
    const tagObj = await this._getByIdOrFail(id);
    await this.tagRepository.delete({ id });

    return tagObj;
  }

  // ==================================================

}
