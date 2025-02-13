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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmService } from './farm.service';
import { farmCreateSchema } from './schemas/create';
import { ApiFarmCreate } from './swagger/create.swagger';
import { ApiFarmFindAll } from './swagger/findAll.swagger';

import { ApiFarmFindById } from './swagger/findById.swagger';
import { ApiFarmRemove } from './swagger/remove.swagger';
import { ApiFarmUpdate } from './swagger/update.swagger';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @ApiFarmCreate()
  @ApiBody({ schema: { example: farmCreateSchema } })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmService.create(createFarmDto);
  }

  /*   @Get('/producer_id')
  @ApiFarmCreate()
  findAllByProducer(@Param('id') id: string) {
    return this.farmService.findByProducerId(id);
  } */

  @Get('')
  @ApiFarmFindAll()
  @ApiQuery({ name: 'producer_id', required: false })
  findAll(@Query('producer_id') producerId) {
    if (producerId) {
      return this.farmService.findByProducerId(producerId);
    }
    return this.farmService.findAll();
  }

  @Get(':id')
  @ApiFarmFindById()
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(id);
  }

  @Patch(':id')
  @ApiFarmUpdate()
  @ApiBody({ schema: { example: farmCreateSchema } })
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(id, updateFarmDto);
  }

  @Delete(':id')
  @ApiFarmRemove()
  remove(@Param('id') id: string) {
    return this.farmService.remove(id);
  }
}
