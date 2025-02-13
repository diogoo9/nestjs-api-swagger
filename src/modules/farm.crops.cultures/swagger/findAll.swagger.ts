import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCropsCultureFindAll(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Listar as de ligações fazenda com safra a uma cultura',
      description: `Permite listar as de ligações fazenda com safra a uma cultura`,
    })(target, propertyKey, descriptor);
  };
}
