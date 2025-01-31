import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from 'src/errors/AppError';
import { CropsService } from './crops.service';
import { CropRepository } from './repository/crop.repository';

describe('CropsService', () => {
  let service: CropsService;

  const mockRepository = {
    createCrop: jest.fn(),
    getAll: jest.fn(),
    getByName: jest.fn(),
    getByCropId: jest.fn(),
    getById: jest.fn(),
    findOneNoDeleted: jest.fn(),
    updateCrops: jest.fn(),
    deleteCrops: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropsService,
        { provide: CropRepository, useValue: mockRepository },
      ],
    }).compile();

    jest.fn().mockClear();
    jest.spyOn(mockRepository, 'createCrop');
    jest.spyOn(mockRepository, 'getAll');
    jest.spyOn(mockRepository, 'getByName');
    jest.spyOn(mockRepository, 'getByCropId');
    jest.spyOn(mockRepository, 'getById');
    jest.spyOn(mockRepository, 'findOneNoDeleted');
    jest.spyOn(mockRepository, 'updateCrops');
    jest.spyOn(mockRepository, 'deleteCrops');

    service = module.get<CropsService>(CropsService);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be able create crop', async () => {
    const data = {
      name: '2025',
    };
    await service.create(data);
    expect(mockRepository.createCrop).toHaveBeenCalledTimes(1);
  });

  it('should be able not create duplicate crop', async () => {
    const data = {
      name: '2025',
    };
    mockRepository.getByName.mockReturnValue(data);

    await expect(service.create(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able findAll', async () => {
    mockRepository.getAll.mockReturnValue([]);

    expect(await service.findAll()).toEqual([]);
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should be able not update crop invalid id ', async () => {
    const data = {
      name: '2026',
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);
    mockRepository.getByName.mockReturnValue(null);

    await expect(service.update(data.id, data)).rejects.toBeInstanceOf(
      AppError,
    );
    expect(mockRepository.getByName).toHaveBeenCalledTimes(0);
    expect(mockRepository.updateCrops).toHaveBeenCalledTimes(0);
  });

  it('should be able update crop', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(data);
    mockRepository.updateCrops.mockReturnValue({ affected: 1 });

    await service.update(data.id, data);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateCrops).toHaveBeenCalledTimes(1);
  });

  it('should be able remove crop', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(data);
    mockRepository.deleteCrops.mockReturnValue({ affected: 1 });

    await service.remove(data.id);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteCrops).toHaveBeenCalledTimes(1);
  });

  it('should be able remove crop error invalid id', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.remove(data.id)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteCrops).toHaveBeenCalledTimes(0);
  });

  it('should be able remove crop', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(data);

    await service.findOne(data.id);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
  });

  it('should be able get remove error invalid id', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.remove(data.id)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
  });
});
