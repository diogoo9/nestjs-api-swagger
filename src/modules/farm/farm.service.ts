import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { ProducerRepository } from '../producer/repository/producer.repository';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmRepository } from './repository/farm.repository';

@Injectable()
export class FarmService {
  constructor(
    private farmRepository: FarmRepository,
    private producerRepository: ProducerRepository,
  ) {}
  async create(createFarmDto: CreateFarmDto) {
    const { area_arable, area_total, area_vegetation } = createFarmDto;
    const existProducer = await this.producerRepository.getById(
      createFarmDto.producer_id,
    );

    const sumedArea = area_vegetation + area_arable;

    if (sumedArea !== area_total) {
      throw new AppError(
        'a soma das áreas araveis e agrcultaveis não é igual a área total',
      );
    }
    if (!existProducer) {
      throw new AppError('o Produtor não existe');
    }

    return this.farmRepository.createFarm(createFarmDto);
  }

  findByProducerId(id: string) {
    return this.farmRepository.getByProducerId(id);
  }
  async findAll() {
    const farms = await this.farmRepository.getAll();
    return farms;
  }

  findOne(id: string) {
    return this.farmRepository.getById(id);
  }

  async update(id: string, updateFarmDto: UpdateFarmDto) {
    const farmExist = await this.farmRepository.getById(id);
    if (!farmExist) {
      throw new AppError('Propriedade não encontrada');
    }
    const affectedRows = (
      await this.farmRepository.updateFarm(id, updateFarmDto)
    ).affected;
    if (affectedRows == 1) {
      return {
        message: 'Propriedade lterada com sucesso',
      };
    }
  }

  async remove(id: string) {
    const farmExist = await this.farmRepository.getById(id);
    if (!farmExist) throw new AppError('Propriedade não encontrada');
    await this.farmRepository.deleteFarm(id);
    return {
      message: 'Propriedade removida com sucesso',
    };
  }
}
