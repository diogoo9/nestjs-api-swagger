import { ApiOperation } from '@nestjs/swagger';

export function ApiCropsFindById(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Buscar as Crops por ID',
      description: `Permite buscar as  Crops por ID`,
    })(target, propertyKey, descriptor);
  };
}
