import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from 'src/errors/AppError';
import { ProducerRepository } from '../producer/repository/producer.repository';
import { FarmService } from './farm.service';
import { FarmRepository } from './repository/farm.repository';

describe('FarmService', () => {
  let service: FarmService;

  const mockRepository = {
    createFarm: jest.fn(),
    getAll: jest.fn(),
    getByProducerId: jest.fn(),
    getById: jest.fn(),
    findOneNoDeleted: jest.fn(),
    updateFarm: jest.fn(),
    deleteFarm: jest.fn(),
  };

  const mockProducerRepository = {
    createProducer: (data) => data,
    getByDocNumber: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    updateProducer: jest.fn(),
    deleteProducer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        { provide: FarmRepository, useValue: mockRepository },
        { provide: ProducerRepository, useValue: mockProducerRepository },
      ],
    }).compile();

    jest.spyOn(mockRepository, 'createFarm');
    jest.spyOn(mockRepository, 'getAll');
    jest.spyOn(mockRepository, 'getByProducerId');
    jest.spyOn(mockRepository, 'getById');
    jest.spyOn(mockRepository, 'findOneNoDeleted');
    jest.spyOn(mockRepository, 'updateFarm');
    jest.spyOn(mockRepository, 'deleteFarm');

    jest.spyOn(mockProducerRepository, 'createProducer');
    jest.spyOn(mockProducerRepository, 'getByDocNumber');
    jest.spyOn(mockProducerRepository, 'getAll');
    jest.spyOn(mockProducerRepository, 'getById');
    jest.spyOn(mockProducerRepository, 'updateProducer');
    jest.spyOn(mockProducerRepository, 'deleteProducer');

    service = module.get<FarmService>(FarmService);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able create farm', async () => {
    const data = {
      city_id: 12,
      area_total: 400,
      area_arable: 200,
      area_vegetation: 200,
      producer_id: '6fd676e7-927a-4989-bd62-dec83d560eb3',
    };
    mockProducerRepository.getById.mockReturnValue({
      id: '6fd676e7-927a-4989-bd62-dec83d560eb3',
    });

    await service.create(data);
    expect(mockRepository.createFarm).toHaveBeenCalledTimes(1);
  });

  it('should be able not create duplicate farm', async () => {
    const data = {
      city_id: 12,
      area_total: 400,
      area_arable: 200,
      area_vegetation: 200,
      producer_id: '6fd676e7-927a-4989-bd62-dec83d560eb3',
    };
    mockRepository.getById.mockReturnValue(data);

    await expect(service.create(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able not create farm productor id invalid', async () => {
    const data = {
      city_id: 12,
      area_total: 400,
      area_arable: 200,
      area_vegetation: 200,
      producer_id: '6fd676e7-927a-4989-bd62-dec83d560eb3',
    };
    mockProducerRepository.getById.mockReturnValue(null);
    await expect(service.create(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able not create farm invalid area', async () => {
    const data = {
      city_id: 12,
      area_total: 200,
      area_arable: 200,
      area_vegetation: 200,
      producer_id: '6fd676e7-927a-4989-bd62-dec83d560eb3',
    };
    mockProducerRepository.getById.mockReturnValue(null);
    await expect(service.create(data)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.createFarm).toHaveBeenCalledTimes(0);
  });

  it('should be able findAll', async () => {
    mockRepository.getAll.mockReturnValue([]);

    expect(await service.findAll()).toEqual([]);
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should be able not update farm invalid id ', async () => {
    const data = {
      id: '6fd676e7-927a-4989-bd62-dec83d560eb3',
      city_id: 12,
      area_total: 400,
      area_arable: 200,
      area_vegetation: 200,
      producer_id: '6fd676e7-927a-4989-bd62-dec83d560eb3',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.update(data.id, data)).rejects.toBeInstanceOf(
      AppError,
    );
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateFarm).toHaveBeenCalledTimes(0);
  });

  it('should be able update farm', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(data);
    mockRepository.updateFarm.mockReturnValue({ affected: 1 });

    await service.update(data.id, data);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateFarm).toHaveBeenCalledTimes(1);
  });

  it('should be able remove farm', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(data);
    mockRepository.deleteFarm.mockReturnValue({ affected: 1 });

    await service.remove(data.id);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteFarm).toHaveBeenCalledTimes(1);
  });

  it('should be able remove farm error invalid id', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.remove(data.id)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteFarm).toHaveBeenCalledTimes(0);
  });

  it('should be able remove farm', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(data);

    await service.findOne(data.id);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
  });

  it('should be able remove error invalid id', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.remove(data.id)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
  });
});
