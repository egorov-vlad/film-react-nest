import { ConfigService } from '@nestjs/config';

const {
  DATABASE_DRIVER = 'mongodb',
  DATABASE_URL = 'mongodb://localhost:27017/afisha',
} = process.env;

export const getConfigProvider = (config: ConfigService) => {
  return {
    database: {
      driver: config.get('DATABASE_DRIVER') || DATABASE_DRIVER,
      url: config.get('DATABASE_URL') || DATABASE_URL,
    },
  };
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
