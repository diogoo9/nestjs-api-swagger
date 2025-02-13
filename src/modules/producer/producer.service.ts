import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { City } from '../cities/entities/city.entity';

import { CreateProducerDto } from './dto/create.producer.dto';
import { UpdateProducerDto } from './dto/update.producer.dto';
import { ProducerRepository } from './repository/producer.repository';

@Injectable()
export class ProducerService {
  constructor(private producerRepository: ProducerRepository) {}

  async create(createProducerDto: CreateProducerDto) {
    const { doc_number } = createProducerDto;
    const existDocNumber = await this.producerRepository.getByDocNumber(
      doc_number?.replace(/[^0-9]/g, ''),
    );

    if (existDocNumber) {
      throw new AppError(
        'usuário já possui cadastro com este número de documento',
      );
    }
    return this.producerRepository.createProducer(createProducerDto);
  }

  findAll() {
    return this.producerRepository.getAllWithRelations();
  }

  async findOne(id: string) {
    const producer = await this.producerRepository.getById(id);
    if (!producer) throw new AppError('Produtor inválido');

    return producer;
  }

  async update(id: string, updateProducerDto: UpdateProducerDto) {
    const producer = await this.producerRepository.getById(id);
    if (!producer) throw new AppError('Produtor inválido');

    await this.producerRepository.updateProducer(id, updateProducerDto);
    return { message: 'Produtor alterado com sucesso!' };
  }

  async remove(id: string) {
    const producer = await this.producerRepository.getById(id);
    if (!producer) throw new AppError('Produtor inválido');

    return this.producerRepository.deleteProducer(id);
  }
}
