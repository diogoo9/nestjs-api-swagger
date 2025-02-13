import { Controller, Get, Param } from '@nestjs/common';
import { GraphicsService } from './graphics.service';
import { ApiGraphicsFindAll } from './swagger/graphics.swagger';

@Controller('graphics')
export class GraphicsController {
  constructor(private readonly graphicsService: GraphicsService) {}

  @Get()
  @ApiGraphicsFindAll()
  findAll() {
    return this.graphicsService.findAll();
  }
}
