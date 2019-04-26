import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDTO, UpdateTagDTO } from './tag.dto';

import { TagEntity } from 'src/shared/models';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  private async _verifyTagValue(value: string) {
    const tagObj = await this.tagRepository.findOne({ where: {value} });
    if (tagObj) {
      throw new BadRequestException('Tag already exists !!!');
    }
    return tagObj;
  }

  private async _checkTagId(id: number) {
    const tagObj = await this.tagRepository.findOne({ where: {id} });
    if (!tagObj) {
      throw new NotFoundException(`Not found record with (id='${id}') !!!`);
    }
    return tagObj;
  }

  // ==================================================
  // CRUD

  async createNew(data: CreateTagDTO): Promise<any> {
    const { value } = data;
    // validation
    await this._verifyTagValue(value);

    const tagObj = await this.tagRepository.create(data);
    await this.tagRepository.save(tagObj);

    return {
      message: 'tag is created !',
      data: tagObj,
    }
  }

  async showAll(): Promise<any> {
    const tagList = await this.tagRepository.find({
      relations: ['notes'],
    });

    return {
      data: tagList,
      total: tagList.length,
    };
  }

  async findOne(id: number): Promise<any> {
    // validation
    await this._checkTagId(id);

    const tagObj = await this.tagRepository.findOne({
      where: {id},
      relations: ['notes'],
    });

    return {
      data: tagObj,
    };
  }

  async updateOne(id: number, data: UpdateTagDTO): Promise<any> {
    const { value } = data;
    // validation
    await this._checkTagId(id);
    await this._verifyTagValue(value);

    await this.tagRepository.update({id}, data);
    const tagObj = await this.tagRepository.findOne({
      where: {id},
      relations: ['notes'],
    });

    return {
      message: 'tag is updated !',
      data: tagObj,
    };
  }

  async deleteOne(id: number): Promise<any> {
    // validation
    await this._checkTagId(id);

    const tagObj = await this.tagRepository.findOne({
      where: {id},
      relations: ['notes'],
    });
    await this.tagRepository.delete({ id });

    return {
      message: 'tag is deleted !',
      data: tagObj,
    };
  }

  // ==================================================

}
