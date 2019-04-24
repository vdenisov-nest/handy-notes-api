import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) { return false; }

    const decoded = await this.validateToken(token);
    request.user = decoded;

    return true;
  }

  async validateToken(auth: string) {
    const [ tokenType, tokenData ] = auth.split(' ');
    if (tokenType !== 'Bearer') {
      throw new ForbiddenException('Invalid token');
    }

    // const { secret: jwtSecretString } = config.get('server');
    const jwtSecretString = 'default-secret';

    try {
      const decoded = jwt.verify(tokenData, jwtSecretString);
      return decoded;
    }
    // tslint:disable-next-line:one-line
    catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new ForbiddenException(message);
    }
  }
}
