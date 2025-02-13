import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCropsFindById(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Buscar as ligações de fazenda a safra por ID',
      description: `Permite buscar as  ligações de fazenda a safra por ID`,
    })(target, propertyKey, descriptor);
  };
}
