import { ApiOperation } from '@nestjs/swagger';

export function ApiCropsRemove(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Remover Crops',
      description: `Permite remover a Crops `,
    })(target, propertyKey, descriptor);
  };
}
