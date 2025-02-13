import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmFindById(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Buscar fazenda por ID',
      description: `Permite buscar as fazendas por ID`,
    })(target, propertyKey, descriptor);
  };
}
