import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from 'src/errors/AppError';
import { ProducerService } from './producer.service';
import { ProducerRepository } from './repository/producer.repository';

describe('ProducerService', () => {
  let service: ProducerService;

  const mockRepository = {
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
        ProducerService,
        { provide: ProducerRepository, useValue: mockRepository },
      ],
    }).compile();

    jest.spyOn(mockRepository, 'createProducer');
    jest.spyOn(mockRepository, 'getByDocNumber');
    jest.spyOn(mockRepository, 'getAll');
    jest.spyOn(mockRepository, 'getById');
    jest.spyOn(mockRepository, 'updateProducer');
    jest.spyOn(mockRepository, 'deleteProducer');
    service = module.get<ProducerService>(ProducerService);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able create product', async () => {
    const data = {
      name: 'John',
      doc_number: '101.202.303-44',
    };
    const response = await service.create(data);
    expect(mockRepository.createProducer).toHaveBeenCalledTimes(1);
    expect(response).toEqual(data);
  });

  it('should be able not create duplicate product', async () => {
    const data = {
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getByDocNumber.mockReturnValue(data);

    expect(mockRepository.createProducer).toHaveBeenCalledTimes(0);
    await expect(service.create(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able findAll', async () => {
    mockRepository.getAll.mockReturnValue([]);

    expect(await service.findAll()).toEqual([]);
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should be able not update producer', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.update(data.id, data)).rejects.toBeInstanceOf(
      AppError,
    );
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateProducer).toHaveBeenCalledTimes(0);
  });

  it('should be able update producer', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(data);

    await service.update(data.id, data);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateProducer).toHaveBeenCalledTimes(1);
  });

  it('should be able remove producer', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(data);

    await service.remove(data.id);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteProducer).toHaveBeenCalledTimes(1);
  });

  it('should be able remove producer error invalid id', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.remove(data.id)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteProducer).toHaveBeenCalledTimes(0);
  });

  it('should be able get producer', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(data);

    await service.findOne(data.id);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
  });

  it('should be able remove producer error invalid id', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.remove(data.id)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
  });
});
