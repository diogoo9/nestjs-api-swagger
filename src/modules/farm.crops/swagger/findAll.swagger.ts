import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCropsFindAll(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Listar as ligações de fazenda a safra ',
      description: `Permite listar as  ligações de fazenda a safra `,
    })(target, propertyKey, descriptor);
  };
}
