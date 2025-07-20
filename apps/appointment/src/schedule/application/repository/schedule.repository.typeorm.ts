import { IScheduleRepository } from '../../domain/repository/repository.interface';
import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entity/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleModel } from '../model/schedule.model';
import { Repository } from 'typeorm';
import { scheduleTypeOrmToEntity } from '../gateway/schedule-typeorm-to-entity';

@Injectable()
export class ScheduleRepositoryTypeORM implements IScheduleRepository {
  constructor(
    @InjectRepository(ScheduleModel)
    private readonly scheduleModel: Repository<ScheduleModel>,
  ) {}

  async findByClientId(clientId: string): Promise<ScheduleEntity[]> {
    const data = await this.scheduleModel.find({
      where: {
        client: {
          id: clientId,
        },
      },
    });

    return data.map((item) => scheduleTypeOrmToEntity(item));
  }

  findByDateRange(startDate: Date, endDate: Date): Promise<ScheduleEntity[]> {
    throw new Error('Method not implemented.');
  }

  findByStatus(status: string): Promise<ScheduleEntity[]> {
    throw new Error('Method not implemented.');
  }

  async create(item: ScheduleEntity): Promise<ScheduleEntity> {
    const scheduleModel = this.scheduleModel.create(item);

    const dataSaved = await this.scheduleModel.save(scheduleModel);

    console.log('dataSaved', dataSaved);

    return scheduleTypeOrmToEntity(dataSaved);
  }

  async findById(id: string): Promise<ScheduleEntity> {
    const data = await this.scheduleModel.findOne({
      where: { id },
    });

    if (!data) {
      return null;
    }

    return scheduleTypeOrmToEntity(data);
  }

  async update(id: string, item: ScheduleEntity): Promise<ScheduleEntity> {
    const dataSaved = await this.scheduleModel.save({
      id,
      ...item,
    });

    return scheduleTypeOrmToEntity(dataSaved);
  }

  async delete(id: string): Promise<void> {
    await this.scheduleModel.softDelete(id);
  }

  async findAll(): Promise<ScheduleEntity[]> {
    const data = await this.scheduleModel.find();

    return data.map((item) => scheduleTypeOrmToEntity(item));
  }
}
