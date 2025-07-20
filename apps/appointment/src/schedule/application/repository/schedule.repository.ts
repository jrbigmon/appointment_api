import { IScheduleRepository } from '../../domain/repository/repository.interface';
import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entity/schedule.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ScheduleRepository implements IScheduleRepository {
  private readonly schedules: ScheduleEntity[] = [];

  create(item: ScheduleEntity): Promise<ScheduleEntity> {
    item.id = randomUUID();
    this.schedules.push(item);
    return Promise.resolve(item);
  }

  findById(id: string): Promise<ScheduleEntity> {
    const schedule = this.schedules.find((s) => s.id === id);
    if (!schedule) {
      return Promise.reject(new Error('Schedule not found'));
    }
    return Promise.resolve(schedule);
  }

  update(id: string, item: ScheduleEntity): Promise<ScheduleEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<ScheduleEntity[]> {
    return Promise.resolve(this.schedules);
  }

  findByClientId(clientId: string): Promise<ScheduleEntity[]> {
    throw new Error('Method not implemented.');
  }

  findByDateRange(startDate: Date, endDate: Date): Promise<ScheduleEntity[]> {
    throw new Error('Method not implemented.');
  }

  findByStatus(status: string): Promise<ScheduleEntity[]> {
    throw new Error('Method not implemented.');
  }
}
