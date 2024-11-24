import mongoose from 'mongoose';
import { DataSource } from 'typeorm';

import { AppConfig } from '../app.config.provider';
import { Films } from './entity/films.entity';
import { Schedules } from './entity/schedule.entity';

export const dbProvider = {
  provide: 'DB_CONNECT',
  useFactory: async (
    config: AppConfig,
  ): Promise<DataSource | typeof mongoose> => {
    const { database } = config;

    if (database.driver !== 'postgres') {
      return mongoose.connect(database.url);
    } else {
      const sourceConnect = new DataSource({
        type: 'postgres',
        host: database.host,
        port: database.port,
        username: database.userName,
        password: database.password,
        database: database.name,
        entities: [Films, Schedules],
        synchronize: true,
      });

      return sourceConnect.initialize();
    }
  },
  inject: ['CONFIG'],
};
