import {
  IsDateString,
  IsEnum,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { BillingTypeEnum } from '../../domain/enums/billing-type.enum';
import { Type } from 'class-transformer';

export class ClientDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}

export class CreateScheduleDto {
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(BillingTypeEnum)
  billingType: BillingTypeEnum;
}
