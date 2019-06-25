import {
  Entity,

  PrimaryGeneratedColumn,
  Column,

  ManyToMany,
  JoinTable,
} from 'typeorm';

import { NoteEntity } from './note.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  value: string;

  // relationships {
  @ManyToMany(type => NoteEntity, notes => notes.tags)
  notes: NoteEntity[];
  // } relationships
}
