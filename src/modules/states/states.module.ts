import { Module } from '@nestjs/common';
import { StateRepository } from './repository/states.repository';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';

@Module({
  controllers: [StatesController],
  providers: [StatesService, StateRepository],
})
export class StatesModule {}
