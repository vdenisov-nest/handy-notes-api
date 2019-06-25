import {
  Entity,

  PrimaryGeneratedColumn,
  Column,

  ManyToMany,
} from 'typeorm';

import { NoteEntity } from './note.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  value: string;

  // relationships {
  @ManyToMany(type => NoteEntity, notes => notes.tags)
  notes: NoteEntity[];
  // } relationships
}
