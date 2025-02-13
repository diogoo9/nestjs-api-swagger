import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiSchema } from '@nestjs/swagger';
import { CreateFarmCropDto } from './dto/create-farm.crop.dto';
import { UpdateFarmCropDto } from './dto/update-farm.crop.dto';
import { FarmCropsService } from './farm.crops.service';
import { CreateFarmCropSchema } from './schemas/create';
import { ApiFarmCropsCreate } from './swagger/create.swagger';
import { ApiFarmCropsFindAll } from './swagger/findAll.swagger';
import { ApiFarmCropsFindById } from './swagger/findById.swagger';
import { ApiFarmCropsRemove } from './swagger/remove.swagger';

@Controller('farm.crops')
export class FarmCropsController {
  constructor(private readonly farmCropsService: FarmCropsService) {}

  @Post()
  @ApiFarmCropsCreate()
  @ApiBody({ schema: { example: CreateFarmCropSchema } })
  create(@Body() createFarmCropDto: CreateFarmCropDto) {
    return this.farmCropsService.create(createFarmCropDto);
  }

  @Get()
  @ApiFarmCropsFindAll()
  findAll() {
    return this.farmCropsService.findAll();
  }

  @Get('/:farmId')
  @ApiFarmCropsFindById()
  findAllByFarmId(@Param('farmId') farm_id: string) {
    return this.farmCropsService.findAllByFarmId(farm_id);
  }

  @Delete('/:farmId/:cropsId')
  @ApiFarmCropsRemove()
  remove(@Param('farmId') farm_id: string, @Param('cropsId') crops_id: string) {
    return this.farmCropsService.remove(farm_id, crops_id);
  }
}
