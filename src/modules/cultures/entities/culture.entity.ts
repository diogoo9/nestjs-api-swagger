import { FarmCrop } from 'src/modules/farm.crops/entities/farm.crop.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('cultures')
export class Culture {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    () => FarmCrop,
    (farmCrop) => farmCrop.cultures, //optional
  )
  @JoinTable({
    name: 'farm_crops_cultures',
    joinColumns: [
      {
        name: 'id',
        referencedColumnName: 'id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'farm_id',
        referencedColumnName: 'farm_id',
      },
      {
        name: 'crops_id',
        referencedColumnName: 'crops_id',
      },
    ],
  })
  farmCrops?: FarmCrop[];

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
