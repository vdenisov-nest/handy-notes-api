import {
  Controller, Logger,
  Post, Get, Put, Delete,
  Body, Param, Query, BadRequestException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Controller('users')
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  private _logData(options: any) {
    // tslint:disable:no-unused-expression
    this.logger.log(`\n\n ===> \t ${ new Date() }`);

    options.id && this.logger.log('ID ' + JSON.stringify(options.id));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
  }

  // ==================================================
  // CRUD

  @Post()
  createNewUser(
    @Body() data: CreateUserDTO,
  ) {
    this._logData({ data });
    return this.userService.createNew(data);
  }

  @Get()
  showAllUsers() {
    return this.userService.showAll();
  }

  @Get(':id')
  findOneUser(
    @Param('id') id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateOneUser(
    @Param('id') id: number,
    @Body() data: UpdateUserDTO,
  ) {
    this._logData({ id, data });
    return this.userService.updateOne(id, data);
  }

  @Delete(':id')
  deleteOneUser(
    @Param('id') id: number,
  ) {
    this._logData({ id });
    return this.userService.deleteOne(id);
  }

  // ==================================================
  // Notes

  @Get(':id/notes')
  showPersonalNotesForUsers(
    @Param('id') id: number,
    @Query('type') type: string,
  ) {
    if (type === 'personal' || type === undefined) {
      return this.userService.showPersonalNotes(id);
    } else if (type === 'favorite') {
      return this.userService.showFavoriteNotes(id);
    } else {
      throw new BadRequestException('Invalid type of notes');
    }
  }

}
