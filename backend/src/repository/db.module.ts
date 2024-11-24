import { Module } from '@nestjs/common';

import { configProvider } from '../app.config.provider';
import { dbProvider } from './db.provider';

@Module({
  providers: [configProvider, dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
