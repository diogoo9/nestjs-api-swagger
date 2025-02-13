import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateFarmCropsCultureDto } from './dto/create-farm.crops.culture.dto';
import { FarmCropsCulturesService } from './farm.crops.cultures.service';
import { createFarmCropsCulturesSchema } from './schemas/create';
import { ApiFarmCropsCultureCreate } from './swagger/create.swagger';
import { ApiFarmCropsCultureFindAll } from './swagger/findAll.swagger';
import { ApiFarmCropsCultureRemove } from './swagger/remove.swagger';

@Controller('farm.crops.cultures')
export class FarmCropsCulturesController {
  constructor(
    private readonly farmCropsCulturesService: FarmCropsCulturesService,
  ) {}

  @Post()
  @ApiFarmCropsCultureCreate()
  @ApiBody({ schema: { example: createFarmCropsCulturesSchema } })
  create(@Body() createFarmCropsCultureDto: CreateFarmCropsCultureDto) {
    return this.farmCropsCulturesService.create(createFarmCropsCultureDto);
  }

  @Get()
  @ApiFarmCropsCultureFindAll()
  findAll() {
    return this.farmCropsCulturesService.findAll();
  }

  @Delete(':id')
  @ApiFarmCropsCultureRemove()
  remove(@Param('id') id: string) {
    return this.farmCropsCulturesService.remove(+id);
  }
}
