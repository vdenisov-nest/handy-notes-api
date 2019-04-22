import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoteController } from './note.controller';
import { NoteService } from './note.service';

import { NoteEntity } from './note.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      NoteEntity,
    ]),
  ],
  controllers: [
    NoteController,
  ],
  providers: [
    NoteService,
  ],
})
export class NoteModule {}
