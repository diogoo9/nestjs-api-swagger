import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { CultureRepository } from './repository/culture.repository';

@Injectable()
export class CulturesService {
  constructor(private cultureRepository: CultureRepository) {}

  async create(createCultureDto: CreateCultureDto) {
    const existCulture = await this.cultureRepository.getByName(
      createCultureDto.name,
    );

    if (existCulture) {
      throw new AppError('Falha, a Cultura já foi registrada anteriormente');
    }
    return this.cultureRepository.createCulture(createCultureDto);
  }

  findAll() {
    return this.cultureRepository.getAll();
  }

  findOne(id: string) {
    return this.cultureRepository.getById(id);
  }

  async update(id: string, updateCultureDto: UpdateCultureDto) {
    const existCulture = await this.cultureRepository.getById(id);
    if (!existCulture) {
      throw new AppError('Falha, a Cultura não existe');
    }

    const { affected } = await this.cultureRepository.updateCultures(
      id,
      updateCultureDto,
    );
    if (affected == 1) return { message: 'Cultura alterada com sucesso' };
  }

  async remove(id: string) {
    const existCulture = await this.cultureRepository.getById(id);
    if (!existCulture) {
      throw new AppError('Falha, a Cultura não existe');
    }

    return this.cultureRepository.deleteCultures(id);
  }
}
