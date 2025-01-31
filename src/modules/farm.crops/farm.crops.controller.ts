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

@Controller('farm.crops')
export class FarmCropsController {
  constructor(private readonly farmCropsService: FarmCropsService) {}

  @Post()
  @ApiBody({ schema: { example: CreateFarmCropSchema } })
  create(@Body() createFarmCropDto: CreateFarmCropDto) {
    return this.farmCropsService.create(createFarmCropDto);
  }

  @Get()
  findAll() {
    return this.farmCropsService.findAll();
  }

  /* @Get('/:cropId')
  findAllCropId(@Param('cropId') crop_id: string) {
    return this.farmCropsService.findAllByCropId(crop_id);
  }
 */
  @Get('/:farmId')
  findAllByFarmId(@Param('farmId') farm_id: string) {
    return this.farmCropsService.findAllByFarmId(farm_id);
  }

  @Delete('/:farmId/:cropsId')
  remove(@Param('farmId') farm_id: string, @Param('cropsId') crops_id: string) {
    return this.farmCropsService.remove(farm_id, crops_id);
  }
}
