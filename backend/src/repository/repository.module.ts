import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilmsRepository } from './films.repository';
import { filmSchema } from '../films/films.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: filmSchema }])],
  providers: [FilmsRepository],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
