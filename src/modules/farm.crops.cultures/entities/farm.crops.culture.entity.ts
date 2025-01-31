import { Culture } from 'src/modules/cultures/entities/culture.entity';
import { FarmCrop } from 'src/modules/farm.crops/entities/farm.crop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('farm_crops_cultures')
export class FarmCropsCulture {
  @PrimaryColumn()
  farm_id: string;

  @PrimaryColumn()
  crops_id: string;

  @PrimaryColumn()
  culture_id: string;

  @CreateDateColumn()
  created_at?: Date;

  @ManyToOne(
    (type) => FarmCrop,
    (farmCrop) => {
      farmCrop.crops_id, farmCrop.farm_id;
    },
  )
  @JoinColumn([{ name: 'farm_id' }, { name: 'crops_id' }])
  farmCrop?: FarmCrop;

  @ManyToOne((type) => Culture, (culture) => culture.id)
  @JoinColumn({ name: 'culture_id' })
  cultura?: Culture;
}
