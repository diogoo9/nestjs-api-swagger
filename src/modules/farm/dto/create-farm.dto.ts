import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';
import { Farm } from '../entities/farm.entity';

export class CreateFarmDto extends PartialType(Farm) {
  id?: string;
  name?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive({
    message(validationArguments) {
      return validationArguments.property + ' Não pode ser negativo';
    },
  })
  @Min(1, {
    message(validationArguments) {
      return validationArguments.property + ' Não pode ser menor que 1';
    },
  })
  area_total?: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive({
    message(validationArguments) {
      return validationArguments.property + ' Não pode ser negativo';
    },
  })
  @Min(1, {
    message(validationArguments) {
      return validationArguments.property + ' Não pode ser menor que 1';
    },
  })
  area_arable?: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive({
    message(validationArguments) {
      return validationArguments.property + ' Não pode ser negativo';
    },
  })
  @Min(1, {
    message(validationArguments) {
      return validationArguments.property + ' Não pode ser menor que 1';
    },
  })
  area_vegetation?: number;

  @IsUUID('4', { message: 'producer_id está no formato inválido' })
  producer_id?: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'o city_id precisa ser número' },
  )
  city_id?: number;
}
