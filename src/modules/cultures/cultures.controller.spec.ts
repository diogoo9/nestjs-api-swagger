import { Test, TestingModule } from '@nestjs/testing';
import { CulturesController } from './cultures.controller';
import { CulturesService } from './cultures.service';

describe('CulturesController', () => {
  let controller: CulturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturesController],
      providers: [CulturesService],
    }).compile();

    controller = module.get<CulturesController>(CulturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
