import {
  Controller, Logger,
  Post, Get, Put, Delete,
  Body, Param,
} from '@nestjs/common';

import { TagService } from './tag.service';
import { CreateTagDTO, UpdateTagDTO } from './tag.dto';

@Controller('tags')
export class TagController {
  private logger = new Logger('TagController');

  constructor(private tagService: TagService) {}

  private _logData(options: any) {
    // tslint:disable:no-unused-expression
    this.logger.log(`\n\n ===> \t ${ new Date() }`);

    options.id && this.logger.log('ID ' + JSON.stringify(options.id));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
  }

  // ==================================================

  @Post()
  createNewNote(
    @Body() data: CreateTagDTO,
  ) {
    this._logData({ data });
    return this.tagService.createNew(data);
  }

  // ==================================================

  @Get()
  showAllNotes() {
    return this.tagService.showAll();
  }

  // ==================================================

  @Get(':id')
  findOneNote(
    @Param('id') id: number,
  ) {
    this._logData({ id });
    return this.tagService.findOne(id);
  }

  // ==================================================

  @Put(':id')
  updateOneNote(
    @Param('id') id: number,
    @Body() data: UpdateTagDTO,
  ) {
    this._logData({ id, data });
    return this.tagService.updateOne(id, data);
  }

  // ==================================================

  @Delete(':id')
  deleteOneNote(
    @Param('id') id: number,
  ) {
    this._logData({ id });
    return this.tagService.deleteOne(id);
  }
}
