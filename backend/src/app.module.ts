import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { DbModule } from './repository/db.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { filmProvider } from './films/films.provider';
import { FilmsMongoRepository } from './repository/films.mongo.repository';
import { FilmsPostgresRepository } from './repository/films.postgres.repository';
import { LoggerModule } from './logger/logger.module';
import { FilmsRepository } from './repository/films.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public'),
    }),
    DbModule,
    LoggerModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    filmProvider,
    OrderService,
    FilmsRepository,
    FilmsMongoRepository,
    FilmsPostgresRepository,
  ],
})
export class AppModule {}
