import { IsDateString, IsEnum } from 'class-validator';

import { BillingTypeEnum } from '../../domain/enums/billing-type.enum';

export class UpdateScheduleDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(BillingTypeEnum)
  billingType: BillingTypeEnum;
}
