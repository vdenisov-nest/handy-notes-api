import {
  Injectable, CanActivate, ExecutionContext,
  ForbiddenException, UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { IConfigJwt } from 'src/shared/config-types';

const JWT: IConfigJwt = config.get('jwt');

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      // return false;
      throw new UnauthorizedException('token required !!!');
    }

    const decoded = await this.validateToken(token);
    request.user = decoded;

    return true;
  }

  async validateToken(auth: string) {
    // const [ tokenType, tokenData ] = auth.split(' ');
    // if (tokenType !== 'Bearer') {
    //   throw new ForbiddenException('Invalid token');
    // }

    const tokenData = auth;

    try {
      const decoded = jwt.verify(tokenData, JWT.secret);
      return decoded;
    }
    // tslint:disable-next-line:one-line
    catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new UnauthorizedException(message);
    }
  }
}
