import { City } from 'src/modules/cities/entities/city.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('states')
export class State {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  UF: number;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
