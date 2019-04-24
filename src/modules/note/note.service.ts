import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNoteDTO, UpdateNoteDTO } from './note.dto';

import { UserEntity } from '../user/user.entity';
import { NoteEntity } from './note.entity';
import { TagEntity } from '../tag/tag.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,

    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  private async _verifyUserId(id: number) {
    const userObj = await this.userRepository.findOne({ where: {id} });
    if (!userObj) {
      throw new NotFoundException(`Not found record with (id='${id}') !!!`);
    }
    return userObj;
  }

  private async _checkNoteId(id: number) {
    const noteObj = await this.noteRepository.findOne({ where: {id} });
    if (!noteObj) {
      throw new NotFoundException(`Not found record with (id='${id}') !!!`);
    }
    return noteObj;
  }

  private async _checkTagId(id: number) {
    const tagObj = await this.tagRepository.findOne({ where: {id} });
    if (!tagObj) {
      throw new NotFoundException(`Not found record with (id='${id}') !!!`);
    }
    return tagObj;
  }

  private _toResponseObject(noteObj: NoteEntity) {
    return {
      ...noteObj,
      tags: noteObj.tags.map(tag => { delete tag.notes; return tag; }),
    };
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
      relations: ['author', 'tags', 'likes'],
    });

    return noteList;
  }

  async findOne(id: number): Promise<any> {
    // validation
    await this._checkNoteId(id);

    const noteObj = this.noteRepository.findOne({
      where: {id},
      relations: ['author', 'tags', 'likes'],
    });

    return noteObj;
  }

  async updateOne(id: number, data: UpdateNoteDTO): Promise<any> {
    // validation
    await this._checkNoteId(id);

    await this.noteRepository.update({id}, data);
    const noteObj = await this.noteRepository.findOne({
      where: {id},
      relations: ['author', 'tags', 'likes'],
    });

    return noteObj;
  }

  async deleteOne(id: number): Promise<any> {
    // validation
    await this._checkNoteId(id);

    const noteObj = await this.noteRepository.findOne({
      where: {id},
      relations: ['author', 'tags', 'likes'],
    });
    await this.noteRepository.delete({ id });

    return noteObj;
  }

  // ==================================================
  // Tags

  async attachTag(noteId: number, tagId: number): Promise<any> {
    // validation {
    await this._checkNoteId(noteId);
    await this._checkTagId(tagId);
    // } validation

    const noteObj = await this.noteRepository.findOne({
      where: {id: noteId},
      relations: ['author', 'tags', 'likes'],
    });
    const tagObj = await this.tagRepository.findOne({
      where: {id: tagId},
      relations: ['notes'],
    });

    // validation {
    const sameTags = noteObj.tags.filter(tag => tag.id === tagId);
    if (sameTags.length > 0) {
      throw new BadRequestException('This tag already attached !!!');
    }
    // } validation

    noteObj.tags.push(tagObj);
    await this.noteRepository.save(noteObj);

    return this._toResponseObject(noteObj);
  }

  async showTags(noteId: number): Promise<any> {
    // validation {
    await this._checkNoteId(noteId);
    // } validation

    const noteObj = await this.noteRepository.findOne({
      where: {id: noteId},
      relations: ['tags'],
    });

    return noteObj.tags;
  }

  async detachTag(noteId: number, tagId: number): Promise<any> {
    // validation {
    await this._checkNoteId(noteId);
    await this._checkTagId(tagId);
    // } validation

    const noteObj = await this.noteRepository.findOne({
      where: {id: noteId},
      relations: ['author', 'tags', 'likes'],
    });

    // validation {
    const sameTags = noteObj.tags.filter(tag => tag.id === tagId);
    if (sameTags.length === 0) {
      throw new BadRequestException('Note hasn`t this tag !!!');
    }
    // } validation

    noteObj.tags = noteObj.tags.filter(tag => tag.id !== tagId);
    await this.noteRepository.save(noteObj);

    return noteObj;
  }

  // ==================================================
  // Likes

  async addLike(noteId: number, userId: number): Promise<any> {
    // validation {
    await this._checkNoteId(noteId);
    await this._verifyUserId(userId);
    // } validation

    const noteObj = await this.noteRepository.findOne({
      where: {id: noteId},
      relations: ['author', 'tags', 'likes'],
    });
    const userObj = await this.userRepository.findOne({
      where: {id: userId},
    });

    // validation {
    const sameLikes = noteObj.likes.filter(user => user.id === userId);
    if (sameLikes.length > 0) {
      throw new BadRequestException('This user has already added like to this note !!!');
    }
    // } validation

    noteObj.likes.push(userObj);
    await this.noteRepository.save(noteObj);

    return this._toResponseObject(noteObj);
  }

  async showLikes(noteId: number): Promise<any> {
    // validation {
    await this._checkNoteId(noteId);
    // } validation

    const noteObj = await this.noteRepository.findOne({
      where: {id: noteId},
      relations: ['likes'],
    });

    return noteObj.likes;
  }

  async removeLike(noteId: number, userId: number): Promise<any> {
    // validation {
    await this._checkNoteId(noteId);
    await this._verifyUserId(userId);
    // } validation

    const noteObj = await this.noteRepository.findOne({
      where: {id: noteId},
      relations: ['author', 'tags', 'likes'],
    });

    // validation {
    const sameLikes = noteObj.likes.filter(user => user.id === userId);
    if (sameLikes.length === 0) {
      throw new BadRequestException('This user has already removed like from this note !!!');
    }
    // } validation

    noteObj.likes = noteObj.likes.filter(user => user.id !== userId);
    await this.noteRepository.save(noteObj);

    return this._toResponseObject(noteObj);
  }

  // ==================================================

}
