import {
  Entity,

  PrimaryGeneratedColumn,
  Column,

  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  text: string;

  // relationships {
  @ManyToOne(type => UserEntity, author => author.personalNotes)
  author: UserEntity;

  @ManyToMany(type => TagEntity, tags => tags.notes)
  @JoinTable({ name: 'notes-tags' })
  tags: TagEntity[];

  @ManyToMany(type => UserEntity, likes => likes.favoriteNotes)
  @JoinTable({ name: 'notes-likes' })
  likes: UserEntity[];
  // } relationships
}
