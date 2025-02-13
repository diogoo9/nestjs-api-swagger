import { ApiOperation, ApiQuery } from '@nestjs/swagger';

export function ApiCitiesFindAll(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Listar Estados e busca por UF',
      description: 'Faz a listagem dos estados e busca por UF',
    })(target, propertyKey, descriptor);

    ApiQuery({
      name: 'UF',
      enum: [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PE',
        'PI',
        'PR',
        'RJ',
        'RN',
        'RO',
        'RR',
        'RS',
        'SC',
        'SE',
        'SP',
        'TO',
      ],
      required: false,
    })(target, propertyKey, descriptor);
  };
}

export function ApiCitiesFindOne(): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any): void {
    ApiOperation({
      summary: 'Busca Cidades por id',
      description: 'Faz busca por id da cidade',
    })(target, propertyKey, descriptor);
  };
}
