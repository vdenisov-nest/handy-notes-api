import {
  Controller, Logger,
  Post, Get, Put, Delete,
  Body, Param,
  UseGuards, UsePipes,
} from '@nestjs/common';

import { TagService } from './tag.service';

import { JoiValidationPipe } from 'src/shared/joi-validation.pipe';
import { tagCreateSchema, tagUpdateSchema } from './tag.joi-schema';
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
  // CRUD

  @Post()
  @UsePipes(new JoiValidationPipe(tagCreateSchema))
  createNewNote(
    @Body() data: CreateTagDTO,
  ) {
    this._logData({ data });
    return this.tagService.createNew(data);
  }

  @Get()
  showAllNotes() {
    return this.tagService.showAll();
  }

  @Get(':id')
  findOneNote(
    @Param('id') id: number,
  ) {
    this._logData({ id });
    return this.tagService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(tagUpdateSchema))
  updateOneNote(
    @Param('id') id: number,
    @Body() data: UpdateTagDTO,
  ) {
    this._logData({ id, data });
    return this.tagService.updateOne(id, data);
  }

  @Delete(':id')
  deleteOneNote(
    @Param('id') id: number,
  ) {
    this._logData({ id });
    return this.tagService.deleteOne(id);
  }

  // ==================================================

}
