import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { CropRepository } from './repository/crop.repository';

@Module({
  controllers: [CropsController],
  providers: [CropsService, CropRepository],
})
export class CropsModule {}
