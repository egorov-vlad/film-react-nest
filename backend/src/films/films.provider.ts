import { AppConfig } from '../app.config.provider';
import { filmSchema } from './films.schema';
import { Films } from '../repository/entity/films.entity';
import { DataSource } from 'typeorm';
import { Mongoose } from 'mongoose';

export const filmProvider = {
  provide: 'FILMS',
  useFactory: (
    connect: {
      getRepository: DataSource['getRepository'];
      model: Mongoose['model'];
    },
    config: AppConfig,
  ) =>
    config.database.driver === 'postgres'
      ? connect.getRepository(Films)
      : connect.model('film', filmSchema),
  inject: ['DB_CONNECT', 'CONFIG'],
};
