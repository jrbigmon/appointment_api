import { BadRequestException } from '@nestjs/common';
import { BillingTypeEnum } from '../../../enums/billing-type.enum';
import { ScheduleCalcPrice } from '../../../gateway/schedule-calc-price.interface';
import { ScheduleCalcPriceCommon } from '../../../gateway/schedule-calc-price-common';
import { ScheduleCalcPricePreferential } from '../../../gateway/schedule-calc-price-preferential';

export class CalculateSchedulePrice {
  private static calculate(
    func: ScheduleCalcPrice,
    range: { startDate: Date; endDate: Date },
  ) {
    const price = func.calc(range.startDate, range.endDate);
    const pricePerHour = func.getPricePerHour();

    return {
      price,
      pricePerHour,
    };
  }

  public static execute(
    range: { startDate: Date; endDate: Date },
    billingType: BillingTypeEnum,
  ) {
    const common = new ScheduleCalcPricePreferential();
    const preferential = new ScheduleCalcPriceCommon();

    switch (billingType) {
      case BillingTypeEnum.COMMON:
        return this.calculate(common, range);
      case BillingTypeEnum.PREFERENTIAL:
        return this.calculate(preferential, range);
      default:
        throw new BadRequestException('Invalid calculation type');
    }
  }
}
