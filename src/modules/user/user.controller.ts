import {
  Controller, Logger,
  Post, Get, Put, Delete,
  Body, Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Controller('users')
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  private logData(options: any) {
    // tslint:disable:no-unused-expression
    this.logger.log(`\n\n ===> \t ${ new Date() }`);

    options.id && this.logger.log('ID ' + JSON.stringify(options.id));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
  }

  // ==================================================

  @Post()
  createNewUser(
    @Body() data: CreateUserDTO,
  ) {
    this.logData({ data });
    return this.userService.createNew(data);
  }

  // ==================================================

  @Get()
  showAllUsers() {
    return this.userService.showAll();
  }

  // ==================================================

  @Get(':id')
  findOneUser(
    @Param('id') id: number,
  ) {
    return this.userService.findOne(id);
  }

  // ==================================================

  @Put(':id')
  updateOneUser(
    @Param('id') id: number,
    @Body() data: UpdateUserDTO,
  ) {
    this.logData({ id, data });
    return this.userService.updateOne(id, data);
  }

  // ==================================================

  @Delete(':id')
  deleteOneUser(
    @Param('id') id: number,
  ) {
    this.logData({ id });
    return this.userService.deleteOne(id);
  }
}
