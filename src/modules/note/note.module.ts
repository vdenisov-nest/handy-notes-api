import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoteController } from './note.controller';
import { NoteService } from './note.service';

import { UserEntity, NoteEntity, TagEntity } from 'src/shared/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      NoteEntity,
      TagEntity,
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
