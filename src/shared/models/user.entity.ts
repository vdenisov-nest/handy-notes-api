import {
  Entity,

  PrimaryGeneratedColumn,
  Column,

  OneToMany,
  ManyToMany,

  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as config from 'config';
import { IConfigJwt } from 'src/shared/config-types';

import { NoteEntity } from './note.entity';

const JWT: IConfigJwt = config.get('jwt');

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // AUTH credetials {
  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;
  // } AUTH credetials

  // PROFILE info {
  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  birthdate: string;
  // } PROFILE info

  // relationships {
  @OneToMany(type => NoteEntity, personalNotes => personalNotes.author)
  personalNotes: NoteEntity[];

  @ManyToMany(type => NoteEntity, favoriteNotes => favoriteNotes.likes)
  favoriteNotes: NoteEntity[];
  // } relationships

  // hooks {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, JWT.salt);
  }
  // } hooks

  // methods {
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  // } methods
}
