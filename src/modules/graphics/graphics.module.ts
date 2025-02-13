import { Module } from '@nestjs/common';
import { FarmRepository } from '../farm/repository/farm.repository';
import { StateRepository } from '../states/repository/states.repository';
import { GraphicsController } from './graphics.controller';
import { GraphicsService } from './graphics.service';

@Module({
  controllers: [GraphicsController],
  providers: [GraphicsService, FarmRepository, StateRepository],
})
export class GraphicsModule {}
