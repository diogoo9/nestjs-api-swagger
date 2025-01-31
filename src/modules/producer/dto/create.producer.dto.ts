import { PartialType } from '@nestjs/swagger';
import { IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IsDOcNumber } from 'src/validators/validator.docNumber';
import { Producer } from '../entities/producer.entity';

export class CreateProducerDto extends PartialType(Producer) {
  @IsString()
  @MinLength(3, { message: 'nome muito pequeno' })
  name?: string;

  @IsString({ message: 'número do documento é obrigatório' })
  @MinLength(11, { message: 'número do documento muito pequeno' })
  @MaxLength(18, { message: 'número do documento muito grande' })
  @IsDOcNumber({
    message(validationArguments) {
      if (validationArguments.value.replace(/[^0-9]/g, '').length == 11) {
        return 'CPF inválido';
      }
      return 'CNPJ inválido';
    },
  })
  doc_number?: string;
}
