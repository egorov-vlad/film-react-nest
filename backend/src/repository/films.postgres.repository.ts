import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Films } from './entity/films.entity';
import { Schedules } from './entity/schedule.entity';

@Injectable()
export class FilmsPostgresRepository {
  constructor(@Inject('FILMS') private filmRepository: Repository<Films>) {}
  async findScheduleByFilmId(id: string): Promise<Schedules[] | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
      order: { schedule: { daytime: 'ASC' } },
    });

    if (!film || !film.schedule) return null;

    return film.schedule;
  }

  async findAll(): Promise<Films[]> {
    const films = await this.filmRepository.find({
      relations: { schedule: true },
    });

    return films;
  }

  async findFilmById(id: string): Promise<Films> {
    return this.filmRepository.findOne({
      where: { id },
      relations: { schedule: true },
    });
  }

  async updateTicket(film: Films): Promise<Films> {
    try {
      return this.filmRepository.save(film);
    } catch (err) {
      console.error(err);
    }
  }
}
