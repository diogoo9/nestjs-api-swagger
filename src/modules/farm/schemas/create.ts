import { CreateFarmDto } from '../dto/create-farm.dto';

export const farmCreateSchema: CreateFarmDto = {
  name: 'Fazenda Cajueiro',
  city_id: 100,
  area_total: 400,
  area_arable: 200,
  area_vegetation: 200,
  producer_id: 'string',
};
