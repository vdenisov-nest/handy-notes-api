import {
  Controller, Logger,
  Post, Get, Put, Delete,
  Body, Param,
} from '@nestjs/common';

import { NoteService } from './note.service';
import { CreateNoteDTO, UpdateNoteDTO } from './note.dto';

@Controller('notes')
export class NoteController {
  private logger = new Logger('NoteController');

  constructor(private noteService: NoteService) {}

  private _logData(options: any) {
    // tslint:disable:no-unused-expression
    this.logger.log(`\n\n ===> \t ${ new Date() }`);

    options.id && this.logger.log('ID ' + JSON.stringify(options.id));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
  }

  // ==================================================
  // CRUD

  @Post()
  createNewNote(
    @Body() data: CreateNoteDTO,
  ) {
    this._logData({ data });
    return this.noteService.createNew(data);
  }

  @Get()
  showAllNotes() {
    return this.noteService.showAll();
  }

  @Get(':id')
  findOneNote(
    @Param('id') id: number,
  ) {
    this._logData({ id });
    return this.noteService.findOne(id);
  }

  @Put(':id')
  updateOneNote(
    @Param('id') id: number,
    @Body() data: UpdateNoteDTO,
  ) {
    this._logData({ id, data });
    return this.noteService.updateOne(id, data);
  }

  @Delete(':id')
  deleteOneNote(
    @Param('id') id: number,
  ) {
    this._logData({ id });
    return this.noteService.deleteOne(id);
  }

  // ==================================================
  // Tags

  @Post(':id/tags')
  attachTagToNote(
    @Param('id') id: string,
    @Body('tagId') tagId: number,
  ) {
    this._logData({ id });
    const noteId: number = parseInt(id, 10);
    return this.noteService.attachTag(noteId, tagId);
  }

  @Get(':id/tags')
  showTagsForNote(
    @Param('id') id: string,
  ) {
    this._logData({ id });
    const noteId: number = parseInt(id, 10);
    return this.noteService.showTags(noteId);
  }

  @Delete(':id/tags')
  detachTagFromNote(
    @Param('id') id: string,
    @Body('tagId') tagId: number,
  ) {
    this._logData({ id });
    const noteId: number = parseInt(id, 10);
    return this.noteService.detachTag(noteId, tagId);
  }

  // ==================================================

}
