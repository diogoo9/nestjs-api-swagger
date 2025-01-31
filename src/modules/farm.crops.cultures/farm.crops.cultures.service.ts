import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { CreateFarmCropsCultureDto } from './dto/create-farm.crops.culture.dto';
import { FarmCropCultureRepository } from './repository/farm.crops.cultures.repository';

@Injectable()
export class FarmCropsCulturesService {
  constructor(private farmCropCultureRepository: FarmCropCultureRepository) {}

  async create(createFarmCropsCultureDto: CreateFarmCropsCultureDto) {
    const existData = await this.farmCropCultureRepository.getByAllIds(
      createFarmCropsCultureDto,
    );

    if (existData) throw new AppError('Dados já cadastrados!');
    try {
      await this.farmCropCultureRepository.insert(createFarmCropsCultureDto);
      return { ...createFarmCropsCultureDto };
    } catch (error) {}
  }

  findAll() {
    return this.farmCropCultureRepository.getAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} farmCropsCulture`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmCropsCulture`;
  }
}
