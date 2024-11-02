import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfigProvider } from '../app.config.provider';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const { database } = getConfigProvider(config);
        return {
          uri: database.url,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
