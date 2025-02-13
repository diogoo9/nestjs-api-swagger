import { Crop } from 'src/modules/crops/entities/crop.entity';
import { Culture } from 'src/modules/cultures/entities/culture.entity';
import { FarmCropsCulture } from 'src/modules/farm.crops.cultures/entities/farm.crops.culture.entity';
import { Farm } from 'src/modules/farm/entities/farm.entity';
import {
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @ManyToOne((type) => Farm, (farm) => farm.farmCrops)
  @JoinColumn({ name: 'farm_id' })
  farm!: Farm;

  @ManyToOne((type) => Crop, (crop) => crop.id)
  @JoinColumn({ name: 'crops_id' })
  crops!: Crop[];

  @ManyToMany(
    () => Culture,
    (culture) => culture.farmCrops, //optional
  )
  @JoinTable({
    name: 'farm_crops_cultures',
    joinColumns: [
      {
        name: 'farm_id',
        referencedColumnName: 'farm_id',
      },
      {
        name: 'crops_id',
        referencedColumnName: 'crops_id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'culture_id',
        referencedColumnName: 'id',
      },
    ],
  })
  cultures?: Culture[];

  @OneToMany(
    () => FarmCropsCulture,
    (farmCropsCulture) => farmCropsCulture.farmCrop, //optional
  )
  @JoinColumn([
    { name: 'farm_id', referencedColumnName: 'farm_id' },
    { name: 'crops_id', referencedColumnName: 'crops_id' },
  ])
  farmCropsCulture?: FarmCropsCulture[];
}
