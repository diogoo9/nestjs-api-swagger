import { CreateFarmCropDto } from '../dto/create-farm.crop.dto';

export const CreateFarmCropSchema: CreateFarmCropDto = {
  farm_id: 'string',
  crops_id: 'string',
};
