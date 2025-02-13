import { Farm } from 'src/modules/farm/entities/farm.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('producers')
export class Producer {
  @PrimaryColumn()
  id: string;

  @Column()
  doc_number: string;

  @Column()
  name: string;

  @DeleteDateColumn()
  deleted_at: string;

  @OneToMany(() => Farm, (farm) => farm.producer)
  farms?: Farm[];

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
