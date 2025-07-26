import { BadRequestException } from '@nestjs/common';
import { BillingTypeEnum } from '../../enums/billing-type.enum';
import { ScheduleCalcPrice } from '../../gateway/schedule-calc-price.interface';
import { ScheduleCalcPriceCommon } from '../../gateway/schedule-calc-price-common';
import { ScheduleCalcPricePreferential } from '../../gateway/schedule-calc-price-preferential';
import { ScheduleEntity } from './schedule.entity';

export class CalculateSchedulePrice {
  private static calculate(func: ScheduleCalcPrice, schedule: ScheduleEntity) {
    const price = func.calc(schedule.getStartDate(), schedule.getEndDate());
    const pricePerHour = func.getPricePerHour();

    schedule.setPrice(price);
    schedule.setPricePerHour(pricePerHour);
  }

  public static execute(
    schedule: ScheduleEntity,
    billingType: BillingTypeEnum,
  ) {
    const common = new ScheduleCalcPricePreferential();
    const preferential = new ScheduleCalcPriceCommon();

    switch (billingType) {
      case BillingTypeEnum.COMMON:
        return this.calculate(common, schedule);
      case BillingTypeEnum.PREFERENTIAL:
        return this.calculate(preferential, schedule);
      default:
        throw new BadRequestException('Invalid calculation type');
    }
  }
}
