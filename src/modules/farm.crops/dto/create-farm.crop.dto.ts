import { PartialType } from '@nestjs/mapped-types';
import { Unique } from 'typeorm';
import { FarmCrop } from '../entities/farm.crop.entity';

export class CreateFarmCropDto extends PartialType(FarmCrop) {
  @Unique('', ['crops_id', 'farm_id'])
  crops_id?: string;
  farm_id?: string;
}
