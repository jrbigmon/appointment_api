import { ScheduleEntity } from '../../domain/entity/schedule.entity';
import { ScheduleModel } from '../model/schedule.model';

export function scheduleTypeOrmToEntity(
  scheduleModel: ScheduleModel,
): ScheduleEntity {
  return new ScheduleEntity({
    id: scheduleModel.id,
    startDate: scheduleModel.startDate,
    endDate: scheduleModel.endDate,
    client: {
      id: scheduleModel.client.id,
      name: scheduleModel.client.name,
    },
    status: scheduleModel.status,
  });
}
