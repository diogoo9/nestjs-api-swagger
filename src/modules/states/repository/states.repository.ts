import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateStateDto } from '../dto/create-state.dto';
import { State } from '../entities/state.entity';

@Injectable()
export class StateRepository extends Repository<State> {
  constructor(dataSource: DataSource) {
    super(State, dataSource.createEntityManager());
  }

  getAll(): Promise<State[]> {
    return this.find({});
  }

  getBy(data): Promise<State[]> {
    return this.find({ where: data });
  }

  getById(id: number): Promise<State> {
    return this.findOne({
      where: { id },
    });
  }
}
