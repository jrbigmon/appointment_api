import { BadRequestException } from '@nestjs/common';
import { ScheduleEntity } from './schedule.entity';

export class ValidateScheduleDate {
  public static execute(schedule: ScheduleEntity) {
    if (!schedule.getEndDate() || !schedule.getStartDate()) {
      throw new BadRequestException(
        'The start date and end date must be provided',
      );
    }

    if (schedule.getStartDate() > schedule.getEndDate()) {
      throw new BadRequestException(
        'The start date must be greater than end date',
      );
    }
  }
}
