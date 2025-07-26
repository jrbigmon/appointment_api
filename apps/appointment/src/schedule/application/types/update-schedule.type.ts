import { BillingTypeEnum } from '../../domain/enums/billing-type.enum';

export type UpdateScheduleInput = {
  id: string;
  startDate: Date;
  endDate: Date;
  billingType: BillingTypeEnum;
};
