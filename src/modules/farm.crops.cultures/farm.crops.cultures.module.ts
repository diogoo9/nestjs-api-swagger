import { Module } from '@nestjs/common';
import { FarmCropsCulturesController } from './farm.crops.cultures.controller';
import { FarmCropsCulturesService } from './farm.crops.cultures.service';
import { FarmCropCultureRepository } from './repository/farm.crops.cultures.repository';

@Module({
  controllers: [FarmCropsCulturesController],
  providers: [FarmCropsCulturesService, FarmCropCultureRepository],
})
export class FarmCropsCulturesModule {}
