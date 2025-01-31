import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { FarmCropsCulture } from '../entities/farm.crops.culture.entity';

export class CreateFarmCropsCultureDto extends PartialType(FarmCropsCulture) {
  @IsUUID('4', {
    message(validationArguments) {
      return validationArguments.property + ' não é um UUID válido';
    },
  })
  crops_id?: string;

  @IsUUID('4', {
    message(validationArguments) {
      return validationArguments.property + ' não é um UUID válido';
    },
  })
  culture_id?: string;

  @IsUUID('4', {
    message(validationArguments) {
      return validationArguments.property + ' não é um UUID válido';
    },
  })
  farm_id?: string;
}
