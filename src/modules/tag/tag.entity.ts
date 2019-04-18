import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  value: string;
}
