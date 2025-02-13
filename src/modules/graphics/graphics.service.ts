import { Injectable } from '@nestjs/common';
import { FarmRepository } from '../farm/repository/farm.repository';
import { StateRepository } from '../states/repository/states.repository';

@Injectable()
export class GraphicsService {
  constructor(
    private farmRepository: FarmRepository,
    private states: StateRepository,
  ) {}

  async findAll() {
    const countFarms = await this.farmRepository.count({
      where: { deleted_at: null },
    });

    const sumTotalArea = await this.farmRepository
      .createQueryBuilder()
      .select(`SUM(CAST(area_total AS NUMERIC))`)
      .getRawOne();

    const states = await this.farmRepository.query(`
      select  
        s.name as state,  
        count(*) as total, 
        round(((count(*)*100)::float/(select count(*) from farms where deleted_at is null))::numeric ,2) percent
      from farms 
        inner join cities as c on c.id  = farms.city_id 
        inner  join states as s on s.id = c.state_id  and c.id = farms.city_id 
      where deleted_at is null
      group by  s.name 
      `);

    const culture = await this.farmRepository.query(`
      select 
      c.name, 
      SUM(f.area_total::numeric) total,
      round((SUM(f.area_total::numeric))*100/(select 
      SUM(f.area_total::numeric) total
      from cultures c 
      left join farm_crops_cultures fcc on c.id = fcc.culture_id 
      left join farms f on f.id = fcc.farm_id 
      left join crops c2 on c2.id = fcc.crops_id),2) percent
      from cultures c 
      left join farm_crops_cultures fcc on c.id = fcc.culture_id 
      left join farms f on f.id = fcc.farm_id 
      left join crops c2 on c2.id = fcc.crops_id
      group by c."name";
        `);

    const arable_vegetation_percent = await this.farmRepository.query(`
        select  
          round((SUM(f.area_arable::numeric))*100/(select SUM(f.area_total::numeric))) arable_percent,
          round((SUM(f.area_vegetation ::numeric))*100/(select SUM(f.area_total::numeric))) vegetation_percent
          from farms f;
        `);

    return {
      countFarms,
      sumTotalArea: Number(sumTotalArea.sum),
      states,
      culture,
      arable_vegetation_percent,
    };
  }
}
