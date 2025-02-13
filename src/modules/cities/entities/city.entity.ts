import { Farm } from 'src/modules/farm/entities/farm.entity';
import { State } from 'src/modules/states/entities/state.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state_id: string;

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state: State;

  @OneToMany(() => Farm, (Farm) => Farm.city)
  farm: Farm[];
}
