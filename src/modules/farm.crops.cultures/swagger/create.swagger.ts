import { ApiOperation } from '@nestjs/swagger';

export function ApiFarmCropsCultureCreate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Criar a de ligação fazenda com safra a uma cultura',
      description: `Permite criar a ligação fazenda com safra a uma cultura`,
    })(target, propertyKey, descriptor);
  };
}
