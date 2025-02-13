import { ApiOperation } from '@nestjs/swagger';

export function ApiCultureRemove(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Remover Cultura',
      description: `Permite remover a Cultura `,
    })(target, propertyKey, descriptor);
  };
}
