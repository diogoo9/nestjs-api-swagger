import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { cropCreateSchema } from './schemas/create.crop.schema';
import { updateCropSchema } from './schemas/update.crop.schema';
import { ApiCropsCreate } from './swagger/create.swagger';
import { ApiCropsFindAll } from './swagger/findAll.swagger';
import { ApiCropsFindById } from './swagger/findById.swagger';
import { ApiCropsRemove } from './swagger/remove.swagger';
import { ApiCropsUpdate } from './swagger/update.swagger';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  @ApiCropsCreate()
  @ApiBody({ schema: { example: cropCreateSchema } })
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  @ApiCropsFindAll()
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':id')
  @ApiCropsFindById()
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(id);
  }

  @Patch(':id')
  @ApiCropsUpdate()
  @ApiBody({ schema: { example: updateCropSchema } })
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  @ApiCropsRemove()
  remove(@Param('id') id: string) {
    return this.cropsService.remove(id);
  }
}
