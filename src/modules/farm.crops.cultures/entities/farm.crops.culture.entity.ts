import { Crop } from 'src/modules/crops/entities/crop.entity';
import { Culture } from 'src/modules/cultures/entities/culture.entity';
import { FarmCrop } from 'src/modules/farm.crops/entities/farm.crop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
      farmCrop.farmCropsCulture;
    },
  )
  @JoinColumn([
    { name: 'farm_id', referencedColumnName: 'farm_id' },
    { name: 'crops_id', referencedColumnName: 'crops_id' },
  ])
  farmCrop?: FarmCrop;

  @ManyToOne((type) => Culture, (culture) => culture.id)
  @JoinColumn({ name: 'culture_id' })
  culture?: Culture;

  @ManyToMany(
    () => Crop,
    (crop) => crop.farmCropsCultures, //optional
  )
  @JoinTable({
    name: 'farm_crops',
    joinColumn: {
      name: 'crops_id',
      referencedColumnName: 'crops_id',
    },
    inverseJoinColumn: {
      name: 'crops_id',
      referencedColumnName: 'id',
    },
  })
  crops?: Crop[];
}
