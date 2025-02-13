import { ApiOperation } from '@nestjs/swagger';

export function ApiCultureFindAll(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Listar as Culturas ',
      description: `Permite listar as  culturas`,
    })(target, propertyKey, descriptor);
  };
}
