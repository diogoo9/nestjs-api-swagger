import { Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { Culture } from '../entities/culture.entity';

@Injectable()
export class CultureRepository extends Repository<Culture> {
  constructor(dataSource: DataSource) {
    super(Culture, dataSource.createEntityManager());
  }

  async createCulture(data: CreateCultureDto) {
    const culture = new Culture();
    Object.assign(culture, data);

    const newculture = await this.save(culture);
    return newculture;
  }

  getAll(): Promise<Culture[]> {
    return this.find();
  }

  getByName(name: string) {
    return this.createQueryBuilder()
      .where('upper(name) like :name', { name: name.toUpperCase() })
      .getOne();
  }
  getByProducerId(id: string): Promise<Culture[]> {
    return this.find();
  }

  getById(id: string): Promise<Culture> {
    return this.findOne({
      where: { id },
    });
  }

  findOneNoDeleted(id: string) {
    return this.findOne({
      where: { id },
    });
  }

  updateCultures(id: string, data: any) {
    return this.update({ id }, data);
  }

  deleteCultures(id: string) {
    return this.delete({ id });
  }
}
