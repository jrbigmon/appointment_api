import { ScheduleCalcPrice } from './schedule-calc-price.interface';

export class ScheduleCalcPricePreferential implements ScheduleCalcPrice {
  private readonly pricePerHour = 50;

  calc(startDate: Date, endDate: Date): number {
    const duration = (endDate.getTime() - startDate.getTime()) / 3600000; // Convert milliseconds to hours
    return duration * this.pricePerHour;
  }

  getPricePerHour(): number {
    return this.pricePerHour;
  }
}
