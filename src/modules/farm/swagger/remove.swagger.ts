import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmRemove(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Remover fazenda',
      description: `Permite remover a fazenda`,
    })(target, propertyKey, descriptor);
  };
}
