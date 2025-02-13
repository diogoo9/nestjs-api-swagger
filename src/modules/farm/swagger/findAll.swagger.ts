import { ApiOperation, ApiQuery } from '@nestjs/swagger';

export function ApiFarmFindAll(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Listar as fazendas ',
      description: `Permite listar as  fazendas`,
    })(target, propertyKey, descriptor);
  };
}
