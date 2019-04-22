import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  text: string;

  // relationships {
  @ManyToOne(type => UserEntity, author => author.notes)
  author: UserEntity;
  // } relationships
}
