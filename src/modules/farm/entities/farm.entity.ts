import { City } from 'src/modules/cities/entities/city.entity';
import { Crop } from 'src/modules/crops/entities/crop.entity';
import { FarmCrop } from 'src/modules/farm.crops/entities/farm.crop.entity';
import { Producer } from 'src/modules/producer/entities/producer.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
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

  @ManyToOne(() => Producer, (producer) => producer.farms)
  @JoinColumn({ name: 'producer_id' })
  producer: Producer;

  @ManyToOne(() => City, (city) => city.farm)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: City;

  @OneToMany((type) => FarmCrop, (farmCrop) => farmCrop.farm)
  @JoinColumn({ name: 'id' })
  farmCrops!: FarmCrop[];

  @ManyToMany(
    () => Crop,
    (crop) => crop.farms, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'farm_crops',
    joinColumn: {
      name: 'farm_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'crops_id',
      referencedColumnName: 'id',
    },
  })
  crops?: Crop[];

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
