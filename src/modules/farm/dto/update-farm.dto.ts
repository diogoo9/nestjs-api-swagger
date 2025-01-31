import { PartialType } from '@nestjs/swagger';
import { CreateFarmDto } from './create-farm.dto';

export class UpdateFarmDto extends PartialType(CreateFarmDto) {
  name?: string;
  area_total?: number;
  area_arable?: number;
  area_vegetation?: number;
  city_id?: number;
  state_id?: number;
}
