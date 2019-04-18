import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  text: string;
}
