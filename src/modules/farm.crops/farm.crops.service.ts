import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { CropRepository } from '../crops/repository/crop.repository';
import { FarmRepository } from '../farm/repository/farm.repository';
import { CreateFarmCropDto } from './dto/create-farm.crop.dto';
import { UpdateFarmCropDto } from './dto/update-farm.crop.dto';
import { FarmCropRepository } from './repository/farm.crop.repository';

@Injectable()
export class FarmCropsService {
  constructor(
    private farmCropRepository: FarmCropRepository,
    private farmRepository: FarmRepository,
    private cropRepository: CropRepository,
  ) {}
  async create(createFarmCropDto: CreateFarmCropDto) {
    const { crops_id, farm_id } = createFarmCropDto;

    const cropExist = await this.cropRepository.getById(crops_id);
    if (!cropExist) throw new AppError('crop_id não existe');

    const farmExist = await this.farmRepository.getById(farm_id);
    if (!farmExist) throw new AppError('farm_id não existe');

    return this.farmCropRepository.createFarmCrop(createFarmCropDto);
  }

  findAll() {
    return this.farmCropRepository.getAll();
  }

  findAllByFarmId(farm_id: string) {
    return this.farmCropRepository.getByFarmId(farm_id);
  }

  findAllByCropId(crop_id: string) {
    return this.farmCropRepository.getByCropId(crop_id);
  }

  async remove(farm_id: string, crops_id: string) {
    try {
      const res = await this.farmCropRepository.deleteFarmCrops(
        farm_id,
        crops_id,
      );
      if (res == 1) return { message: 'Removido com sucesso!' };
    } catch (error) {
      throw new AppError('Falha ao remover');
    }
  }
}
