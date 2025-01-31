import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { Farm } from '../entities/farm.entity';

@Injectable()
export class FarmRepository extends Repository<Farm> {
  constructor(dataSource: DataSource) {
    super(Farm, dataSource.createEntityManager());
  }

  async createFarm(data: CreateFarmDto) {
    const farm = new Farm();
    farm.created_at = new Date();

    Object.assign(farm, data);

    const newfarm = await this.save(farm);
    return newfarm;
  }

  getAll(): Promise<Farm[]> {
    return this.find({
      where: { deleted_at: null },
    });
  }

  getByProducerId(id: string): Promise<Farm[]> {
    return this.find({
      where: { deleted_at: null, producer_id: id },
    });
  }

  getById(id: string): Promise<Farm> {
    return this.findOne({
      where: { deleted_at: null, id },
    });
  }

  findOneNoDeleted(id: string, userId: string) {
    return this.findOne({
      where: { id },
    });
  }

  updateFarm(id: string, data: any) {
    return this.update({ id }, data);
  }

  deleteFarm(id: string) {
    return this.softRemove({ id });
  }
}
