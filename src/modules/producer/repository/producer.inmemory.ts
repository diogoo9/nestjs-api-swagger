import { Injectable } from '@nestjs/common';
import { Producer } from 'src/modules/producer/entities/producer.entity';
import { ProducerContractRepository } from 'src/modules/producer/producer.contract';

@Injectable()
export class ProducerInMemoryRepository implements ProducerContractRepository {
  data: Producer[] = [];

  deleteProducer(id: string): Promise<any> {
    const index = this.data.findIndex((data) => data.id === id);
    delete this.data[index];
    return Promise.resolve({ affected: 1 });
  }

  getAllWithRelations = (): Promise<Producer[]> => {
    return Promise.resolve(this.data);
  };

  getById = (id: string): Promise<Producer> => {
    return Promise.resolve(this.data.find((producer) => producer.id === id));
  };

  createProducer = (data: Producer): Promise<Producer> => {
    const producer = new Producer();
    data.doc_number = data.doc_number.replace(/[^0-9]/g, '');
    Object.assign(producer, data);

    this.data.push(producer);
    return Promise.resolve(producer);
  };

  getByDocNumber = (doc_number: string): Promise<Producer> => {
    return Promise.resolve(
      this.data.find((producer) => producer.doc_number === doc_number),
    );
  };

  updateProducer = (id: string, data: Producer): Promise<any> => {
    let affected = 0;
    const index = this.data.findIndex((data) => data.id === id);

    if (index != -1) {
      this.data[index] = data;
      return Promise.resolve({ affected: 1 });
    }
    Promise.resolve({ affected: 0 });
  };
}
