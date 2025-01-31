import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { FarmModule } from 'src/modules/farm/farm.module';
import { CropsModule } from './crops/crops.module';
import { CulturesModule } from './cultures/cultures.module';
import { FarmCropsCulturesModule } from './farm.crops.cultures/farm.crops.cultures.module';
import { FarmCropsModule } from './farm.crops/farm.crops.module';
import { ProducerModule } from './producer/producer.module';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      logging: false,
    }),
    ProducerModule,
    FarmModule,
    CropsModule,
    CulturesModule,
    FarmCropsModule,
    FarmCropsCulturesModule,
  ],
})
export class AppModule {}
