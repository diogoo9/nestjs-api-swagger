import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateCropDto } from '../dto/create-crop.dto';
import { Crop } from '../entities/crop.entity';

@Injectable()
export class CropRepository extends Repository<Crop> {
  constructor(dataSource: DataSource) {
    super(Crop, dataSource.createEntityManager());
  }

  async createCrop(data: CreateCropDto) {
    const crop = new Crop();
    Object.assign(crop, data);

    const newcrop = await this.save(crop);
    return newcrop;
  }

  getAll(): Promise<Crop[]> {
    return this.find();
  }

  getByName(name: string) {
    return this.findOne({ where: { name } });
  }
  getByProducerId(id: string): Promise<Crop[]> {
    return this.find();
  }

  getById(id: string): Promise<Crop> {
    return this.findOne({
      where: { id },
    });
  }

  findOneNoDeleted(id: string) {
    return this.findOne({
      where: { id },
    });
  }

  updateCrops(id: string, data: any) {
    return this.update({ id }, data);
  }

  deleteCrops(id: string) {
    return this.delete({ id });
  }
}
