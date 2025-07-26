import { IRepository } from 'apps/appointment/shared/repository/repository.interface';
import { ScheduleEntity } from '../entity/schedule/schedule.entity';

export interface IScheduleRepository extends IRepository<ScheduleEntity> {
  findByClientId(clientId: string): Promise<ScheduleEntity[]>;
  findByDateRange(options: {
    startDate: Date;
    endDate: Date;
    take?: number;
    skip?: number;
    order?: string[][];
  }): Promise<ScheduleEntity[]>;
}
