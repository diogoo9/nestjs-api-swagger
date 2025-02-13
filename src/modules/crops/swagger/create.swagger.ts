import { ApiOperation } from '@nestjs/swagger';

export function ApiCropsCreate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Criar a Crops',
      description: `Permite criar a Crops `,
    })(target, propertyKey, descriptor);
  };
}
