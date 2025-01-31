import { Module } from '@nestjs/common';
import { ProducerRepository } from '../producer/repository/producer.repository';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { FarmRepository } from './repository/farm.repository';

@Module({
  controllers: [FarmController],
  providers: [FarmService, FarmRepository, ProducerRepository],
})
export class FarmModule {}
