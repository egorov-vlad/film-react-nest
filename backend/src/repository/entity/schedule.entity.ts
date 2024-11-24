import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

import { Films } from './films.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column('double precision', { nullable: false })
  @IsNumber()
  price: number;

  @Column({ type: 'text' })
  @IsString()
  taken: string;

  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films;
}
