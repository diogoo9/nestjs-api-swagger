import { Test, TestingModule } from '@nestjs/testing';
import { FarmCropsCulturesService } from './farm.crops.cultures.service';

describe('FarmCropsCulturesService', () => {
  let service: FarmCropsCulturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmCropsCulturesService],
    }).compile();

    service = module.get<FarmCropsCulturesService>(FarmCropsCulturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
