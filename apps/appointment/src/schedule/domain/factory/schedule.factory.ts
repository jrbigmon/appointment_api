import {
  ClientEntity,
  ScheduleEntity,
} from '../entity/schedule/schedule.entity';

import { BillingTypeEnum } from '../enums/billing-type.enum';
import { CalculateSchedulePrice } from '../entity/schedule/caculate-schedule-price';
import { GetScheduleStatus } from '../entity/schedule/get-schedule-status';
import { ValidateScheduleDate } from '../entity/schedule/validate-schedule';
import { randomUUID } from 'node:crypto';

type CreateScheduleInput = {
  startDate: Date;
  endDate: Date;
  client: ClientEntity;
  billingType: BillingTypeEnum;
};

type UpdateScheduleInput = Partial<Omit<CreateScheduleInput, 'client'>>;

export class ScheduleFactory {
  public static create(input: CreateScheduleInput): ScheduleEntity {
    const { client, startDate, endDate, billingType } = input;

    const schedule = new ScheduleEntity({
      id: randomUUID(),
      client,
      startDate,
      endDate,
    });

    CalculateSchedulePrice.execute(schedule, billingType);
    GetScheduleStatus.execute(schedule);
    ValidateScheduleDate.execute(schedule);

    return schedule;
  }

  public static update(
    input: UpdateScheduleInput,
    schedule: ScheduleEntity,
  ): void {
    const { startDate, endDate, billingType } = input;

    startDate && schedule.setStartDate(startDate);
    endDate && schedule.setEndDate(endDate);

    CalculateSchedulePrice.execute(schedule, billingType);
    GetScheduleStatus.execute(schedule);
    ValidateScheduleDate.execute(schedule);
  }
}
