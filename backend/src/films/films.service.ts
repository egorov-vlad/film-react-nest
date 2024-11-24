import { Inject, Injectable } from '@nestjs/common';
import { FilmsMongoRepository } from '../repository/films.mongo.repository';
import { FilmsPostgresRepository } from '../repository/films.postgres.repository';
import { FilmsDTO } from './dto/films.dto';
import { GetScheduleDTO } from './dto/schedule.dto';
import { AppConfig } from '../app.config.provider';
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
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsMongoRepository: FilmsMongoRepository,
    private readonly filmsPostgresRepository: FilmsPostgresRepository,
  ) {}

  async findAll(): Promise<IFindAllResponse> {
    let films: FilmsDTO[] | Films[];

    if (this.config.database.driver === 'postgres') {
      films = await this.filmsPostgresRepository.findAll();
    } else {
      films = await this.filmsMongoRepository.findAll();
    }

    return {
      total: films.length,
      items: films,
    };
  }

  async findById(id: string): Promise<IFindByIdResponse> {
    let schedule: GetScheduleDTO[] | Schedules[];

    if (this.config.database.driver === 'postgres') {
      schedule = await this.filmsPostgresRepository.findScheduleByFilmId(id);
    } else {
      schedule = await this.filmsMongoRepository.findScheduleByFilmId(id);
    }

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
