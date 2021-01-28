import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TvSeries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  seasons: number;
}
