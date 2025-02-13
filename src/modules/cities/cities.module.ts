import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityRepository } from './repository/cities.repository';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, CityRepository],
})
export class CitiesModule {}
