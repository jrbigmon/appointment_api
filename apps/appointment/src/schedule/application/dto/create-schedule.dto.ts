import { IsDateString, IsEnum, IsUUID, ValidateNested } from 'class-validator';

import { BillingTypeEnum } from '../../domain/enums/billing-type.enum';
import { Type } from 'class-transformer';

export class ClientDto {
  @IsUUID()
  id: string;
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
