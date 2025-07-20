import { BadRequestException } from '@nestjs/common';
import { ScheduleCalcPrice } from '../gateway/schedule-calc-price.interface';

export class ScheduleEntity {
  id: string;
  startDate: Date;
  endDate: Date;
  client: {
    id: string;
    name: string;
  };
  status: ScheduleStatusEnum;

  constructor(schedule?: Partial<ScheduleEntity>) {
    if (schedule) {
      this.id = schedule.id;
      this.client = schedule.client;
      this.startDate = schedule.startDate;
      this.endDate = schedule.endDate;
      this.status = this.getStatus();
    }

    this.validate();
  }

  validate(): void {
    if (!this.client?.id || !this.client?.name) {
      throw new BadRequestException('Client information is incomplete');
    }

    if (!this.startDate || !this.endDate) {
      throw new BadRequestException('Start date and end date are required');
    }

    if (isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime())) {
      throw new BadRequestException(
        'Start date and end date must be valid dates',
      );
    }

    if (this.startDate >= this.endDate) {
      throw new BadRequestException('Start date must be before end date');
    }
  }

  getStatus(): ScheduleStatusEnum {
    const now = new Date();
    if (this.startDate > now) {
      return ScheduleStatusEnum.SCHEDULED;
    } else if (this.endDate < now) {
      return ScheduleStatusEnum.COMPLETED;
    } else {
      return ScheduleStatusEnum.IN_PROGRESS;
    }
  }

  getPrice(scheduleCalcInterface: ScheduleCalcPrice): number {
    return scheduleCalcInterface.calc(this.startDate, this.endDate);
  }
}

export enum ScheduleStatusEnum {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
