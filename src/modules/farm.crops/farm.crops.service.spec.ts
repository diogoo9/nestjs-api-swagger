import { Test, TestingModule } from '@nestjs/testing';
import { FarmCropsService } from './farm.crops.service';
import { FarmCropRepository } from './repository/farm.crop.repository';

describe('FarmCropsService', () => {
  let service: FarmCropsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmCropsService,
        { provide: FarmCropRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<FarmCropsService>(FarmCropsService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
