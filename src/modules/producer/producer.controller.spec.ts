import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from 'src/errors/AppError';
import { CreateProducerDto } from './dto/create.producer.dto';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

describe('ProducerController', () => {
  let controller: ProducerController;

  const mockProducerService = {
    create: (data) => data,
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [{ provide: ProducerService, useValue: mockProducerService }],
    }).compile();

    jest.spyOn(mockProducerService, 'create');
    jest.spyOn(mockProducerService, 'findAll');
    jest.spyOn(mockProducerService, 'findOne');
    jest.spyOn(mockProducerService, 'remove');

    controller = module.get<ProducerController>(ProducerController);
  });

  it('should be able call service.create', async () => {
    const result = await controller.create({
      name: 'John',
      doc_number: '101.202.303-44',
    });
    expect(result).toEqual({ name: 'John', doc_number: '101.202.303-44' });

    expect(mockProducerService.create).toHaveBeenCalledTimes(1);
  });

  it('should be able call service.findAll', async () => {
    await controller.findAll();

    expect(mockProducerService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should be able call service.findOne', async () => {
    const id = 'd26b559b-23bb-4bf4-8e49-1f29fac26853';
    await controller.findOne(id);

    expect(mockProducerService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should be able call service.update', async () => {
    const id = 'd26b559b-23bb-4bf4-8e49-1f29fac26853';
    await controller.update(id, {
      name: 'John',
      doc_number: '101.202.303-44',
    });

    expect(mockProducerService.update).toHaveBeenCalledTimes(1);
  });

  it('should be able call service.remove', async () => {
    const id = 'd26b559b-23bb-4bf4-8e49-1f29fac26853';
    await controller.remove(id);

    expect(mockProducerService.remove).toHaveBeenCalledTimes(1);
  });
});
