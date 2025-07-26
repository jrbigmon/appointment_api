import { BillingTypeEnum } from '../../domain/enums/billing-type.enum';

export type CreateScheduleInput = {
  startDate: Date;
  endDate: Date;
  billingType: BillingTypeEnum;
  client: {
    id: string;
  };
};
