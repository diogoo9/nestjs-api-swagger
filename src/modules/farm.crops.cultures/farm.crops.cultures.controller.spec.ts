import { Test, TestingModule } from '@nestjs/testing';
import { FarmCropsCulturesController } from './farm.crops.cultures.controller';
import { FarmCropsCulturesService } from './farm.crops.cultures.service';

describe('FarmCropsCulturesController', () => {
  let controller: FarmCropsCulturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmCropsCulturesController],
      providers: [FarmCropsCulturesService],
    }).compile();

    controller = module.get<FarmCropsCulturesController>(FarmCropsCulturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
