import { Test, TestingModule } from '@nestjs/testing';
import { FarmCropsController } from './farm.crops.controller';
import { FarmCropsService } from './farm.crops.service';

describe('FarmCropsController', () => {
  let controller: FarmCropsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmCropsController],
      providers: [FarmCropsService],
    }).compile();

    controller = module.get<FarmCropsController>(FarmCropsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
