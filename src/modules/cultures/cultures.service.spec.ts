import { Test, TestingModule } from '@nestjs/testing';
import { AppError } from 'src/errors/AppError';
import { CulturesService } from './cultures.service';
import { CultureRepository } from './repository/culture.repository';

describe('CulturesService', () => {
  let service: CulturesService;

  const mockRepository = {
    createCulture: jest.fn(),
    getAll: jest.fn(),
    getByName: jest.fn(),
    getByProducerId: jest.fn(),
    getById: jest.fn(),
    findOneNoDeleted: jest.fn(),
    updateCultures: jest.fn(),
    deleteCultures: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CulturesService,
        { provide: CultureRepository, useValue: mockRepository },
      ],
    }).compile();

    jest.spyOn(mockRepository, 'createCulture');
    jest.spyOn(mockRepository, 'getAll');
    jest.spyOn(mockRepository, 'getByName');
    jest.spyOn(mockRepository, 'getByProducerId');
    jest.spyOn(mockRepository, 'getById');
    jest.spyOn(mockRepository, 'findOneNoDeleted');
    jest.spyOn(mockRepository, 'updateCultures');
    jest.spyOn(mockRepository, 'deleteCultures');

    service = module.get<CulturesService>(CulturesService);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be able create culture', async () => {
    const data = {
      name: '2025',
    };
    await service.create(data);
    expect(mockRepository.createCulture).toHaveBeenCalledTimes(1);
  });

  it('should be able not create duplicate culture', async () => {
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

  it('should be able not update culture invalid id ', async () => {
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
    expect(mockRepository.updateCultures).toHaveBeenCalledTimes(0);
  });

  it('should be able update culture', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
      name: 'John',
      doc_number: '101.202.303-44',
    };
    mockRepository.getById.mockReturnValue(data);
    mockRepository.updateCultures.mockReturnValue({ affected: 1 });

    await service.update(data.id, data);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateCultures).toHaveBeenCalledTimes(1);
  });

  it('should be able remove culture', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(data);
    mockRepository.deleteCultures.mockReturnValue({ affected: 1 });

    await service.remove(data.id);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteCultures).toHaveBeenCalledTimes(1);
  });

  it('should be able remove culture error invalid id', async () => {
    const data = {
      id: 'ea29443c-4f5e-4180-add3-2c0d8838a62c',
    };
    mockRepository.getById.mockReturnValue(null);

    await expect(service.remove(data.id)).rejects.toBeInstanceOf(AppError);
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteCultures).toHaveBeenCalledTimes(0);
  });

  it('should be able remove culture', async () => {
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
