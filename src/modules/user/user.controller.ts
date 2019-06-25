import {
  Controller, Logger,
  Post, Get, Put, Patch, Delete,
  Body, Param, Query,
  UseGuards, UsePipes,
  BadRequestException,
} from '@nestjs/common';

import { UserService } from './user.service';

import { JoiValidationPipe } from 'src/shared/joi-validation.pipe';
import { userCreateSchema, userUpdateSchema } from './user.joi-schema';
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
  @UsePipes(new JoiValidationPipe(userCreateSchema))
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

  @Patch(':id')
  // TODO: pipe try to validate all arguments (@Body and @Param)
  // * Joi.validate(id) ===> error "value must be an object"
  // * Joi.validate(data) ===> OK
  // @UsePipes(new JoiValidationPipe(userUpdateSchema))
  updateOneUser(
    @Param('id') id: number,
    // @Body() data: UpdateUserDTO,
    @Body(new JoiValidationPipe(userUpdateSchema)) data: UpdateUserDTO,
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
  showNotesForUser(
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
