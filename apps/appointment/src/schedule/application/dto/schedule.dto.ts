import { BillingTypeEnum } from '../../domain/enums/billing-type.enum';
import { ScheduleEntity } from '../../domain/entity/schedule/schedule.entity';

class ClientDto {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class ScheduleDto {
  id: string;
  startDate: Date;
  endDate: Date;
  price: number;
  pricePerHour: number;
  billingType: BillingTypeEnum;
  client: ClientDto;

  constructor(schedule: ScheduleEntity) {
    const { id, startDate, endDate, price, pricePerHour, billingType, client } =
      schedule;
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.pricePerHour = pricePerHour;
    this.billingType = billingType;
    this.client = client;
  }
}
