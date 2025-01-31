import { Crop } from 'src/modules/crops/entities/crop.entity';
import { Farm } from 'src/modules/farm/entities/farm.entity';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('farm_crops')
export class FarmCrop {
  @PrimaryColumn()
  farm_id: string;

  @PrimaryColumn()
  crops_id: string;

  @ManyToOne((type) => Farm, (farm) => farm.id)
  @JoinColumn({ name: 'farm_id' })
  farm!: Farm;

  @ManyToOne((type) => Crop, (crop) => crop.id)
  @JoinColumn({ name: 'crops_id' })
  Crop!: Crop;
}
