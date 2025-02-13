import { Controller, Get, Param, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiCitiesFindAll, ApiCitiesFindOne } from './swagger/cities.swagger';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiCitiesFindAll()
  findAll(@Query() query) {
    const { UF } = query;
    return this.citiesService.findByUFOrAll(UF);
  }

  @Get(':id')
  @ApiCitiesFindOne()
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }
}
