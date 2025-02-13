import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmUpdate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Alterar fazenda',
      description: `Permite alterar a fazenda`,
    })(target, propertyKey, descriptor);
  };
}
