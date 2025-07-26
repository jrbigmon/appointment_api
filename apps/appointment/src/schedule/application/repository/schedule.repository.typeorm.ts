import { IScheduleRepository } from '../../domain/repository/repository.interface';
import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entity/schedule/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleModel } from '../model/schedule.model';
import {
  FindManyOptions,
  FindOptionsOrder,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { scheduleTypeOrmToEntity } from '../gateway/schedule-typeorm-to-entity';

@Injectable()
export class ScheduleRepositoryTypeORM implements IScheduleRepository {
  private readonly defaultTake = 20;
  private readonly defaultSkip = 0;
  private readonly defaultOrder: FindOptionsOrder<ScheduleModel> = {
    createdAt: 'DESC',
  };

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

  async findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<ScheduleEntity[]> {
    const result = await this.scheduleModel.find({
      where: {
        startDate: MoreThanOrEqual(startDate),
        endDate: LessThanOrEqual(endDate),
      },
    });

    return result.map((item) => scheduleTypeOrmToEntity(item));
  }

  async create(item: ScheduleEntity): Promise<ScheduleEntity> {
    const scheduleModel = this.scheduleModel.create(item.toJSON());

    const dataSaved = await this.scheduleModel.save(scheduleModel);

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

  async findAll(
    options: FindManyOptions<ScheduleModel> = {},
  ): Promise<ScheduleEntity[]> {
    options.take ??= this.defaultTake;
    options.skip ??= this.defaultSkip;
    options.order ??= this.defaultOrder;

    const data = await this.scheduleModel.find(options);

    return data.map((item) => scheduleTypeOrmToEntity(item));
  }
}
