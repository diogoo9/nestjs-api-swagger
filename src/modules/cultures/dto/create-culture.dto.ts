import { PartialType } from '@nestjs/swagger';
import { Culture } from '../entities/culture.entity';

export class CreateCultureDto extends PartialType(Culture) {
  name?: string;
}
