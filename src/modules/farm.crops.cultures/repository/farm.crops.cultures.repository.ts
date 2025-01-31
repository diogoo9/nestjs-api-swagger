import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateFarmCropsCultureDto } from '../dto/create-farm.crops.culture.dto';
import { FarmCropsCulture } from '../entities/farm.crops.culture.entity';

@Injectable()
export class FarmCropCultureRepository extends Repository<FarmCropsCulture> {
  constructor(dataSource: DataSource) {
    super(FarmCropsCulture, dataSource.createEntityManager());
  }

  async create1(data: CreateFarmCropsCultureDto) {
    const farmCropsCulture = new FarmCropsCulture();

    Object.assign(farmCropsCulture, data);

    const newfarm = await this.insert(farmCropsCulture);
    return newfarm;
  }

  getAll(): Promise<FarmCropsCulture[]> {
    return this.find();
  }

  getByAllIds(findData: CreateFarmCropsCultureDto): Promise<FarmCropsCulture> {
    return this.findOne({
      where: { ...findData },
    });
  }

  deleteFarm(id: string) {
    //return this.softRemove({ id });
  }
}
