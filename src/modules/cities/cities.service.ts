import { Injectable } from '@nestjs/common';
import { CityRepository } from './repository/cities.repository';

@Injectable()
export class CitiesService {
  constructor(private cityRepository: CityRepository) {}
  findByUFOrAll(UF: string) {
    if (UF) return this.cityRepository.getByStateUF(UF);
    return this.cityRepository.getAll();
  }

  findOne(id: number) {
    return this.cityRepository.getById(id);
  }
}
