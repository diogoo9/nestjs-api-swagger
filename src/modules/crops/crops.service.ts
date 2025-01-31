import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CropRepository } from './repository/crop.repository';

@Injectable()
export class CropsService {
  constructor(private cropRepository: CropRepository) {}
  async create(createCropDto: CreateCropDto) {
    const existCrop = await this.cropRepository.getByName(createCropDto.name);

    if (existCrop) {
      throw new AppError('Falha, a Safra já foi registrada anteriormente');
    }
    return this.cropRepository.createCrop(createCropDto);
  }

  findAll() {
    return this.cropRepository.getAll();
  }

  findOne(id: string) {
    return this.cropRepository.getById(id);
  }

  async update(id: string, updateCropDto: UpdateCropDto) {
    const existCrop = await this.cropRepository.getById(id);
    if (!existCrop) throw new AppError('id invãlido!');

    const cropByName = await this.cropRepository.getByName(updateCropDto.name);
    if (cropByName) throw new AppError('Já existe uma safra com este nome!');

    try {
      const res = await this.cropRepository.updateCrops(id, updateCropDto);
      if (res.affected == 1) {
        return { message: 'Safra alterada com sucesso' };
      }
    } catch (error) {
      throw new AppError('Falha ao alterar a Safra');
    }
  }

  async remove(id: string) {
    const existCrop = await this.cropRepository.getById(id);
    if (!existCrop) {
      throw new AppError('A Safra não existe');
    }

    const { affected } = await this.cropRepository.deleteCrops(id);
    if (affected == 1) return { message: 'Safra removida com sucesso' };
  }
}
