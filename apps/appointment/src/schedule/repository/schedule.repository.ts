import { IRepository } from 'apps/appointment/shared/repository.interface';
import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../entity/schedule.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ScheduleRepository implements IRepository<ScheduleEntity> {
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
}
