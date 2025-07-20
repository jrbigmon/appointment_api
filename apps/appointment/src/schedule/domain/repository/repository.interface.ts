import { IRepository } from 'apps/appointment/shared/repository.interface';
import { ScheduleEntity } from '../entity/schedule.entity';

export interface IScheduleRepository extends IRepository<ScheduleEntity> {
  findByClientId(clientId: string): Promise<ScheduleEntity[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<ScheduleEntity[]>;
  findByStatus(status: string): Promise<ScheduleEntity[]>;
}
