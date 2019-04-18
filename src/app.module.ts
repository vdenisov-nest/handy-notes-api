import * as config from 'config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const DB_PARAMS: any = config.get('DATABASE');
const { type, host, port, username, password, database } = DB_PARAMS;
const dbURI = `${type}://${username}:${password}@${host}:${port}/${database}`;

// tslint:disable-next-line:no-console
console.log('\n', '=> DB URI =>', dbURI, '\n');
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DB_PARAMS }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
