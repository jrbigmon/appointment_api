import { BadRequestException } from '@nestjs/common';
import { ScheduleCalcPriceA } from '../gateway/schedule-calc-price-a';
import { ScheduleCalcPriceB } from '../gateway/schedule-calc-price-b';
import { ScheduleEntity } from '../entity/schedule.entity';

export function usecaseCalculatePrice(
  schedule: ScheduleEntity,
  type: 'a' | 'b',
): {
  price: number;
  pricePerHour: number;
} {
  const priceA = new ScheduleCalcPriceA();
  const priceB = new ScheduleCalcPriceB();

  switch (type) {
    case 'a':
      return {
        price: schedule.getPrice(priceA),
        pricePerHour: priceA.getPricePerHour(),
      };
    case 'b':
      return {
        price: schedule.getPrice(priceB),
        pricePerHour: priceB.getPricePerHour(),
      };
    default:
      throw new BadRequestException('Invalid calculation type');
  }
}
