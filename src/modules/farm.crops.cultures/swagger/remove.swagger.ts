import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCropsCultureRemove(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Remover as  ligações fazenda com safra a uma cultura',
      description: `Permite remover as de ligações fazenda com safra a uma cultura`,
    })(target, propertyKey, descriptor);
  };
}
