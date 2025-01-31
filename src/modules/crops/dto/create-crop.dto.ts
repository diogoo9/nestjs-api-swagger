import { PartialType } from '@nestjs/mapped-types';
import { Crop } from '../entities/crop.entity';

export class CreateCropDto extends PartialType(Crop) {
  name?: string;
}
