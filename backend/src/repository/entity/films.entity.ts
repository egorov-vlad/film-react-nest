import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Schedules } from './schedule.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column()
  @IsString()
  tags: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film, { cascade: true })
  schedule: Schedules[];
}
