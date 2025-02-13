import { ApiOperation } from '@nestjs/swagger';

export function ApiCropsFindAll(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Listar as Cropss ',
      description: `Permite listar as  Cropss`,
    })(target, propertyKey, descriptor);
  };
}
