import { ScheduleEntity } from './schedule.entity';
import { ScheduleStatusEnum } from '../../enums/schedule-status.enum';

export class GetScheduleStatus {
  public static execute(schedule: ScheduleEntity) {
    const now = new Date();

    if (schedule.getStartDate() > now) {
      schedule.setStatus(ScheduleStatusEnum.SCHEDULED);
    } else if (schedule.getEndDate() < now) {
      schedule.setStatus(ScheduleStatusEnum.COMPLETED);
    } else {
      schedule.setStatus(ScheduleStatusEnum.IN_PROGRESS);
    }
  }
}
