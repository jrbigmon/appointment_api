import { ClientEntity } from '../../domain/entity/client/client.entity';
import { GetScheduleStatus } from '../../domain/entity/schedule/get-schedule-status';
import { ScheduleEntity } from '../../domain/entity/schedule/schedule.entity';
import { ScheduleModel } from '../model/schedule.model';

export function scheduleTypeOrmToEntity(
  scheduleModel: ScheduleModel,
): ScheduleEntity {
  const schedule = new ScheduleEntity({
    id: scheduleModel.id,
    startDate: scheduleModel.startDate,
    endDate: scheduleModel.endDate,
    price: scheduleModel.price,
    pricePerHour: scheduleModel.pricePerHour,
    client: new ClientEntity({
      id: scheduleModel.client.id,
      name: scheduleModel.client.name,
    }),
  });

  GetScheduleStatus.execute(schedule);

  return schedule;
}
