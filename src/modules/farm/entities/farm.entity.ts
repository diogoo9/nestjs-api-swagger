import { Producer } from 'src/modules/producer/entities/producer.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('farms')
export class Farm {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'producer_id' })
  producer_id: string;

  @Column()
  city_id: number;

  @Column()
  area_total: number;

  @Column('float', { precision: 20 })
  area_arable: number;

  @Column('decimal')
  area_vegetation: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @ManyToOne(() => Producer, (producer) => producer.farm)
  @JoinColumn({ name: 'producer_id' })
  producer: Producer;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
