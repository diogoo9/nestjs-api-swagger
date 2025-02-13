import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateProducerDto } from '../dto/create.producer.dto';
import { UpdateProducerDto } from '../dto/update.producer.dto';
import { Producer } from '../entities/producer.entity';
import { ProducerContractRepository } from '../producer.contract';

@Injectable()
export class ProducerRepository
  extends Repository<Producer>
  implements ProducerContractRepository
{
  constructor(dataSource: DataSource) {
    super(Producer, dataSource.createEntityManager());
  }

  async createProducer(data: CreateProducerDto) {
    const producer = new Producer();
    data.doc_number = data.doc_number.replace(/[^0-9]/g, '');
    Object.assign(producer, data);
    console.log('assing', producer);

    const newProducer = await this.save(producer);
    return newProducer;
  }

  getByDocNumber(doc_number: string): Promise<Producer> {
    return this.findOne({
      where: { doc_number },
    });
  }

  async getAllWithRelations(): Promise<Producer[]> {
    const a = await this.createQueryBuilder('producers')
      .leftJoinAndSelect('producers.farms', 'farms')
      .leftJoinAndSelect('farms.city', 'city')
      .leftJoinAndSelect('city.state', 'state')
      .leftJoinAndSelect('farms.crops', 'crops')
      .leftJoinAndSelect('crops.farmCrop', 'farmCrop')
      .leftJoinAndSelect('farmCrop.farmCropsCulture', 'farmCropsCulture')
      .leftJoinAndSelect('farmCropsCulture.culture', 'culture')
      .select([
        'producers',
        'farms',
        'crops',
        'farmCrop',
        'farmCropsCulture',
        'culture',
        'city',
        'state',
      ])
      .getMany();

    console.log(a);
    return a;

    return this.find({
      where: { deleted_at: null },
      relations: ['farms', 'farms.crops'],
    });
  }

  getById(id: string): Promise<Producer> {
    return this.findOne({
      where: { deleted_at: null, id },
    });
  }

  updateProducer(id: string, data: UpdateProducerDto): Promise<any> {
    return this.update({ id }, data);
  }

  deleteProducer(id: string) {
    return this.softRemove({ id });
  }
}
