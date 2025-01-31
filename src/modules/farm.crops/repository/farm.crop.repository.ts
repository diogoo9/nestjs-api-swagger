import { Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateFarmCropDto } from '../dto/create-farm.crop.dto';
import { FarmCrop } from '../entities/farm.crop.entity';

@Injectable()
export class FarmCropRepository extends Repository<FarmCrop> {
  constructor(dataSource: DataSource) {
    super(FarmCrop, dataSource.createEntityManager());
  }

  async createFarmCrop(data: CreateFarmCropDto) {
    const farmCrop = new FarmCrop();

    Object.assign(farmCrop, data);

    const newfarm = await this.save(farmCrop);
    return newfarm;
  }

  getAll(): Promise<FarmCrop[]> {
    return this.find({});
  }

  async getByFarmId(farm_id: string): Promise<FarmCrop[]> {
    /*     return this.createQueryBuilder()
      .where('farm_id LIKE :farm_id', { farm_id })
      .getMany(); */

    return this.find({ where: { farm_id } });
  }

  getByCropId(crops_id: string): Promise<FarmCrop[]> {
    return this.find({ where: { crops_id: crops_id } });
  }

  async deleteFarmCrops(farm_id: string, crops_id: string) {
    const { affected } = await this.delete({ farm_id, crops_id });

    return affected;
  }
}
