import { ApiOperation } from '@nestjs/swagger';

export function ApiGraphicsFindAll(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Listar gráficos',
      description: `retorna os seguintes resultados
      countFarms - total de fazendas 
      sumTotalArea - soma do total de areas
      states - percentual de estados
      culture - percentual de culuras plantadas
      arable_vegetation_percent - percentual Por uso do solo (área agricultável e vegetação).`,
    })(target, propertyKey, descriptor);
  };
}
