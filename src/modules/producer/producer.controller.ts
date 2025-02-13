import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateProducerDto } from './dto/create.producer.dto';
import { UpdateProducerDto } from './dto/update.producer.dto';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiBody({
    schema: { example: { doc_number: '141.784.897-50', name: 'Diogo' } },
  })
  @ApiOperation({
    summary: 'Cadastrar produtor',
    description: 'Permite cadastrar um novo produtor',
  })
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar produtores',
    description: 'Retorna os produtores',
  })
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca produtor pelo ID',
    description: 'Retorna os produtor encontrado pelo ID informado',
  })
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    schema: { example: { name: 'string' } },
  })
  @ApiOperation({
    summary: 'Alterar produtor',
    description: 'Permite alterar dados de um produtor',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return await this.producerService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir produtor',
    description: 'Permite excluir um produtor',
  })
  remove(@Param('id') id: string) {
    return this.producerService.remove(id);
  }
}
