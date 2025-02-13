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
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { cultureCreateSchema } from './schemas/create';
import { ApiCultureCreate } from './swagger/create.swagger';
import { ApiCultureFindAll } from './swagger/findAll.swagger';
import { ApiCultureFindById } from './swagger/findById.swagger';
import { ApiCultureRemove } from './swagger/remove.swagger';
import { ApiCultureUpdate } from './swagger/update.swagger';

@Controller('cultures')
export class CulturesController {
  constructor(private readonly culturesService: CulturesService) {}

  @Post()
  @ApiCultureCreate()
  @ApiBody({ schema: { example: cultureCreateSchema } })
  create(@Body() createCultureDto: CreateCultureDto) {
    return this.culturesService.create(createCultureDto);
  }

  @Get()
  @ApiCultureFindAll()
  findAll() {
    return this.culturesService.findAll();
  }

  @Get(':id')
  @ApiCultureFindById()
  findOne(@Param('id') id: string) {
    return this.culturesService.findOne(id);
  }

  @Patch(':id')
  @ApiCultureUpdate()
  @ApiBody({ schema: { example: cultureCreateSchema } })
  update(@Param('id') id: string, @Body() updateCultureDto: UpdateCultureDto) {
    return this.culturesService.update(id, updateCultureDto);
  }

  @Delete(':id')
  @ApiCultureRemove()
  remove(@Param('id') id: string) {
    return this.culturesService.remove(id);
  }
}
