import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateFarmCropsCultureDto } from './dto/create-farm.crops.culture.dto';
import { FarmCropsCulturesService } from './farm.crops.cultures.service';
import { createFarmCropsCulturesSchema } from './schemas/create';

@Controller('farm.crops.cultures')
//@ApiTags('11');
export class FarmCropsCulturesController {
  constructor(
    private readonly farmCropsCulturesService: FarmCropsCulturesService,
  ) {}

  @Post()
  @ApiBody({ schema: { example: createFarmCropsCulturesSchema } })
  create(@Body() createFarmCropsCultureDto: CreateFarmCropsCultureDto) {
    return this.farmCropsCulturesService.create(createFarmCropsCultureDto);
  }

  @Get()
  findAll() {
    return this.farmCropsCulturesService.findAll();
  }

  // @Get('')
  // findOne(@Query('idd') idd?: string) {
  //   return this.farmCropsCulturesService.findOne(idd);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmCropsCulturesService.remove(+id);
  }
}
