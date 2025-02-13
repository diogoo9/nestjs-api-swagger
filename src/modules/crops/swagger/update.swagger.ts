import { ApiOperation } from '@nestjs/swagger';

export function ApiCropsUpdate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Alterar Crops ',
      description: `Permite alterar a Crops`,
    })(target, propertyKey, descriptor);
  };
}
