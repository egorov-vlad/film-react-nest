import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from 'src/app.config.provider';
import { FilmsMongoRepository } from './films.mongo.repository';
import { FilmsPostgresRepository } from './films.postgres.repository';

@Injectable()
export class FilmsRepository {
  readonly repository: FilmsMongoRepository | FilmsPostgresRepository;

  constructor(
    @Inject('CONFIG') readonly config: AppConfig,
    readonly filmsPostgresRepository: FilmsPostgresRepository,
    readonly filmsMongoRepository: FilmsMongoRepository,
  ) {
    this.repository =
      config.database.driver === 'postgres'
        ? this.filmsPostgresRepository
        : this.filmsMongoRepository;
  }
}
