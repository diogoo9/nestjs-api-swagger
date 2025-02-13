import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCropsRemove(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Remover as  ligações fazenda a safra ',
      description: `Permite remover as de ligações fazenda a safra `,
    })(target, propertyKey, descriptor);
  };
}
