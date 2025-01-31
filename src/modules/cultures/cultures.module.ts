import { Module } from '@nestjs/common';
import { CulturesController } from './cultures.controller';
import { CulturesService } from './cultures.service';
import { CultureRepository } from './repository/culture.repository';

@Module({
  controllers: [CulturesController],
  providers: [CulturesService, CultureRepository],
})
export class CulturesModule {}
