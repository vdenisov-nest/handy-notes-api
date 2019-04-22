import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NoteEntity } from '../note/note.entity';

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
  username: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  birthdate: Date;
  // } PROFILE info

  // relationships {
  @OneToMany(type => NoteEntity, note => note.author)
  notes: NoteEntity[];
  // } relationships
}
