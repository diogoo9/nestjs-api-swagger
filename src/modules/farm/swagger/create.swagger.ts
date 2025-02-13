import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCreate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Criar a fazenda',
      description: `Permite criar a fazenda`,
    })(target, propertyKey, descriptor);
  };
}
