import { ApiOperation } from '@nestjs/swagger';

export function ApiCultureCreate(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Criar a cultura',
      description: `Permite criar a cultura `,
    })(target, propertyKey, descriptor);
  };
}
