import { BillingTypeEnum } from '../enums/billing-type.enum';
import { CalculateSchedulePrice } from '../entity/schedule/functions/caculate-schedule-price';
import { ClientEntity } from '../entity/client/client.entity';
import { GetScheduleStatus } from '../entity/schedule/functions/get-schedule-status';
import { ScheduleEntity } from '../entity/schedule/schedule.entity';
import { ValidateScheduleDate } from '../entity/schedule/functions/validate-schedule';
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

    const range = { startDate, endDate };

    const { price, pricePerHour } = CalculateSchedulePrice.execute(
      range,
      billingType,
    );

    const status = GetScheduleStatus.execute(range);

    const schedule = new ScheduleEntity({
      id: randomUUID(),
      client,
      startDate,
      endDate,
      billingType,
      price,
      pricePerHour,
      status,
    });

    ValidateScheduleDate.execute(schedule);

    return schedule;
  }

  public static update(
    input: UpdateScheduleInput,
    schedule: ScheduleEntity,
  ): void {
    const { startDate, endDate, billingType } = input;

    const range = {
      startDate: startDate ?? schedule.startDate,
      endDate: endDate ?? schedule.endDate,
    };

    const { price, pricePerHour } = CalculateSchedulePrice.execute(
      range,
      billingType,
    );

    schedule.startDate = range.startDate;
    schedule.endDate = range.endDate;
    schedule.price = price;
    schedule.pricePerHour = pricePerHour;

    ValidateScheduleDate.execute(schedule);
  }
}
