import { Injectable } from '@nestjs/common';
import { StateRepository } from './repository/states.repository';

@Injectable()
export class StatesService {
  constructor(private stateRepository: StateRepository) {}

  findByNameOrAll(UF: string) {
    if (UF) {
      return this.stateRepository.getBy({ UF: UF });
    }
    return this.stateRepository.getAll();
  }

  findOne(id: number) {
    return this.stateRepository.getById(id);
  }
}
