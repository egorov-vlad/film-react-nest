import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  async findAll() {
    const films = await this.filmsRepository.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  async findById(id: string) {
    const schedule = await this.filmsRepository.findScheduleByFilmId(id);

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
