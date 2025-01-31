import { Module } from '@nestjs/common';
import { CropRepository } from '../crops/repository/crop.repository';
import { FarmRepository } from '../farm/repository/farm.repository';
import { FarmCropsController } from './farm.crops.controller';
import { FarmCropsService } from './farm.crops.service';
import { FarmCropRepository } from './repository/farm.crop.repository';

@Module({
  controllers: [FarmCropsController],
  providers: [
    FarmCropsService,
    FarmCropRepository,
    FarmRepository,
    CropRepository,
  ],
})
export class FarmCropsModule {}
