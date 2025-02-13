import { ApiOperation } from '@nestjs/swagger';

export function ApiCultureUpdate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Alterar Cultura ',
      description: `Permite alterar a Cultura`,
    })(target, propertyKey, descriptor);
  };
}
