import { ClassProperties } from 'apps/appointment/shared/types/class-properties.type';
import { ClientEntity } from '../client/client.entity';
import { ScheduleStatusEnum } from '../../enums/schedule-status.enum';

export class ScheduleEntity {
  private readonly id: string;
  private readonly client: ClientEntity;
  private startDate: Date;
  private endDate: Date;
  private price: number;
  private pricePerHour: number;
  private status: ScheduleStatusEnum;

  constructor({
    id,
    client,
    startDate,
    endDate,
    price,
    pricePerHour,
    status,
  }: {
    id: string;
    client: ClientEntity;
    startDate: Date;
    endDate: Date;
    price?: number;
    pricePerHour?: number;
    status?: ScheduleStatusEnum;
  }) {
    this.id = id;
    this.client = client;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.pricePerHour = pricePerHour;
    this.status = status;
  }

  getId() {
    return this.id;
  }

  getClient() {
    return this.client;
  }

  getStartDate() {
    return this.startDate;
  }

  setStartDate(value: Date) {
    this.startDate = value;
  }

  getEndDate() {
    return this.endDate;
  }

  setEndDate(value: Date) {
    this.endDate = value;
  }

  getPrice() {
    return this.price;
  }

  setPrice(value: number) {
    this.price = value;
  }

  getPricePerHour() {
    return this.pricePerHour;
  }

  setPricePerHour(value: number) {
    this.pricePerHour = value;
  }

  getStatus() {
    return this.status;
  }

  setStatus(value: ScheduleStatusEnum) {
    this.status = value;
  }

  toJSON(): ClassProperties<ScheduleEntity> {
    return structuredClone(this);
  }
}
