import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { StatesService } from './states.service';
import { ApiStatesFindAll, ApiStatesFindOne } from './swagger/states.swagger';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  @ApiStatesFindAll()
  findAll(@Query() query) {
    const { UF } = query;
    return this.statesService.findByNameOrAll(UF);
  }

  @Get(':id')
  @ApiStatesFindOne()
  findOne(@Param('id') id: number) {
    return this.statesService.findOne(id);
  }
}
