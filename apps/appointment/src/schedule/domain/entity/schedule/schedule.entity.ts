import { BillingTypeEnum } from '../../enums/billing-type.enum';
import { ClientEntity } from '../client/client.entity';
import { ScheduleStatusEnum } from '../../enums/schedule-status.enum';

export class ScheduleEntity {
  private readonly _id: string;
  private readonly _client: ClientEntity;
  private _startDate: Date;
  private _endDate: Date;
  private _price: number;
  private _pricePerHour: number;
  private _status: ScheduleStatusEnum;
  private _billingType: BillingTypeEnum;

  constructor({
    id,
    client,
    startDate,
    billingType,
    endDate,
    price,
    pricePerHour,
    status,
  }: {
    id: string;
    client: ClientEntity;
    startDate: Date;
    endDate: Date;
    billingType: BillingTypeEnum;
    price: number;
    pricePerHour: number;
    status: ScheduleStatusEnum;
  }) {
    this._id = id;
    this._client = client;
    this._startDate = startDate;
    this._endDate = endDate;
    this._price = price;
    this._billingType = billingType;
    this._pricePerHour = pricePerHour;
    this._status = status;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter client
   * @return {ClientEntity}
   */
  public get client(): ClientEntity {
    return this._client;
  }

  /**
   * Getter startDate
   * @return {Date}
   */
  public get startDate(): Date {
    return this._startDate;
  }

  /**
   * Getter endDate
   * @return {Date}
   */
  public get endDate(): Date {
    return this._endDate;
  }

  /**
   * Getter price
   * @return {number}
   */
  public get price(): number {
    return this._price;
  }

  /**
   * Getter pricePerHour
   * @return {number}
   */
  public get pricePerHour(): number {
    return this._pricePerHour;
  }

  /**
   * Getter status
   * @return {ScheduleStatusEnum}
   */
  public get status(): ScheduleStatusEnum {
    return this._status;
  }

  /**
   * Getter billingType
   * @return {BillingTypeEnum}
   */
  public get billingType(): BillingTypeEnum {
    return this._billingType;
  }

  /**
   * Setter startDate
   * @param {Date} value
   */
  public set startDate(value: Date) {
    this._startDate = value;
  }

  /**
   * Setter endDate
   * @param {Date} value
   */
  public set endDate(value: Date) {
    this._endDate = value;
  }

  /**
   * Setter price
   * @param {number} value
   */
  public set price(value: number) {
    this._price = value;
  }

  /**
   * Setter pricePerHour
   * @param {number} value
   */
  public set pricePerHour(value: number) {
    this._pricePerHour = value;
  }

  /**
   * Setter status
   * @param {ScheduleStatusEnum} value
   */
  public set status(value: ScheduleStatusEnum) {
    this._status = value;
  }

  /**
   * Setter billingType
   * @param {BillingTypeEnum} value
   */
  public set billingType(value: BillingTypeEnum) {
    this._billingType = value;
  }
}
