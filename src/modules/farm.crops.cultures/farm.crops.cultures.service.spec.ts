import { Test, TestingModule } from '@nestjs/testing';
import { FarmCropsCulturesService } from './farm.crops.cultures.service';
import { FarmCropCultureRepository } from './repository/farm.crops.cultures.repository';

describe('FarmCropsCulturesService', () => {
  let service: FarmCropsCulturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmCropsCulturesService,
        { provide: FarmCropCultureRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<FarmCropsCulturesService>(FarmCropsCulturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
