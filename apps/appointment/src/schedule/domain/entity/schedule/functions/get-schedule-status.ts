import { ScheduleStatusEnum } from '../../../enums/schedule-status.enum';

export class GetScheduleStatus {
  public static execute(range: { startDate: Date; endDate: Date }) {
    const now = new Date();

    if (range.startDate > now) {
      return ScheduleStatusEnum.SCHEDULED;
    } else if (range.endDate < now) {
      return ScheduleStatusEnum.COMPLETED;
    } else {
      return ScheduleStatusEnum.IN_PROGRESS;
    }
  }
}
