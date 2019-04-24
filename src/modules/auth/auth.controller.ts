import {
  Controller, Logger,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/shared/auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDTO, LoginUserDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  private _logData(options: any) {
    // tslint:disable:no-unused-expression
    this.logger.log(`\n\n ===> \t ${ new Date() }`);

    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
  }

  // ==================================================

  @Post('register')
  registerUser(
    @Body() data: RegisterUserDTO,
  ) {
    this._logData({ data });
    return this.authService.register(data);
  }

  @Post('login')
  loginUser(
    @Body() data: LoginUserDTO,
  ) {
    this._logData({ data });
    return this.authService.login(data);
  }

  @Post('test-jwt')
  @UseGuards(new AuthGuard())
  testJWT() {
    return { result: 'token verified !' };
  }

}
