import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsDTO } from './dto/films.dto';
import { GetScheduleDTO } from './dto/schedule.dto';
import { Films } from '../repository/entity/films.entity';
import { Schedules } from '../repository/entity/schedule.entity';

export interface IFindAllResponse {
  total: number;
  items: FilmsDTO[] | Films[];
}

export interface IFindByIdResponse {
  total: number;
  items: GetScheduleDTO[] | Schedules[];
}

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<IFindAllResponse> {
    const films: FilmsDTO[] | Films[] =
      await this.filmsRepository.repository.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  async findById(id: string): Promise<IFindByIdResponse> {
    const schedule: GetScheduleDTO[] | Schedules[] =
      await this.filmsRepository.repository.findScheduleByFilmId(id);

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
