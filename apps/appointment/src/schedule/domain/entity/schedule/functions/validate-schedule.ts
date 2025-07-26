import { BadRequestException } from '@nestjs/common';
import { ScheduleEntity } from '../schedule.entity';

export class ValidateScheduleDate {
  public static execute(schedule: ScheduleEntity) {
    if (!schedule.endDate || !schedule.startDate) {
      throw new BadRequestException(
        'The start date and end date must be provided',
      );
    }

    if (schedule.startDate > schedule.endDate) {
      throw new BadRequestException(
        'The start date must be greater than end date',
      );
    }
  }
}
