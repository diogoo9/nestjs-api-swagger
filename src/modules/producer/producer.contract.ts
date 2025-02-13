import { CreateProducerDto } from './dto/create.producer.dto';
import { UpdateProducerDto } from './dto/update.producer.dto';
import { Producer } from './entities/producer.entity';

export abstract class ProducerContractRepository {
  abstract createProducer(data: CreateProducerDto): Promise<Producer>;
  abstract getByDocNumber(doc_number: string): Promise<Producer>;
  abstract getAllWithRelations(): Promise<Producer[]>;
  abstract getById(id: String): Promise<Producer>;
  abstract updateProducer(id: string, data: UpdateProducerDto): Promise<any>;
  abstract deleteProducer(id: string): Promise<Producer>;
}
