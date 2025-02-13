import { Injectable } from '@nestjs/common';
import { State } from 'src/modules/states/entities/state.entity';
import { DataSource, Repository } from 'typeorm';
import { City } from '../entities/city.entity';

@Injectable()
export class CityRepository extends Repository<City> {
  constructor(dataSource: DataSource) {
    super(City, dataSource.createEntityManager());
  }

  getAll(): Promise<City[]> {
    return this.find({});
  }

  getByStateUF(data): Promise<City[]> {
    return this.find({ where: { state: { UF: data } } });
  }

  getById(id: number): Promise<City> {
    return this.findOne({
      where: { id },
    });
  }
}
