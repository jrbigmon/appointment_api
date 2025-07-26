import { FindManyOptions } from 'typeorm';
import { IRepository } from 'apps/appointment/shared/repository/repository.interface';
import { ScheduleEntity } from '../entity/schedule/schedule.entity';
import { ScheduleModel } from '../../application/model/schedule.model';

export interface IScheduleRepository extends IRepository<ScheduleEntity> {
  findByClientId(clientId: string): Promise<ScheduleEntity[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<ScheduleEntity[]>;
  findAll(options?: FindManyOptions<ScheduleModel>): Promise<ScheduleEntity[]>;
}
