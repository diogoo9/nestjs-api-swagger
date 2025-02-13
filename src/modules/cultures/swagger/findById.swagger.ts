import { ApiOperation } from '@nestjs/swagger';

export function ApiCultureFindById(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Buscar as Cultura por ID',
      description: `Permite buscar as  cultura por ID`,
    })(target, propertyKey, descriptor);
  };
}
