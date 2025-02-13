import { Culture } from 'src/modules/cultures/entities/culture.entity';
import { FarmCropsCulture } from 'src/modules/farm.crops.cultures/entities/farm.crops.culture.entity';
import { FarmCrop } from 'src/modules/farm.crops/entities/farm.crop.entity';
import { Farm } from 'src/modules/farm/entities/farm.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('crops')
export class Crop {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    () => Farm,
    (farm) => farm.crops, //optional
  )
  @JoinTable({
    name: 'farm_crops',
    joinColumn: {
      name: 'crop_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'crops_id',
      referencedColumnName: 'id',
    },
  })
  farms?: Farm[];

  @ManyToMany(
    () => FarmCropsCulture,
    //(FarmCropsCulture) => FarmCropsCulture.crops, //optional
  )
  @JoinTable({
    name: 'farm_crops',
    joinColumn: {
      name: 'crops_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'crops_id',
      referencedColumnName: 'crops_id',
    },
  })
  farmCropsCultures?: FarmCropsCulture[];

  @OneToMany(
    () => FarmCrop,
    (FarmCrop) => FarmCrop.crops, //optional
  )
  farmCrop?: FarmCropsCulture[];

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
