import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCropsCreate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Criar a ligação de fazenda a safra',
      description: `Permite criar a ligação fazenda a safra `,
    })(target, propertyKey, descriptor);
  };
}
