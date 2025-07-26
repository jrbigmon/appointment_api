import { IScheduleRepository } from '../../domain/repository/schedule.repository.interface';
import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../../domain/entity/schedule/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleModel } from '../model/schedule.model';
import {
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
  private readonly defaultOrder = [['createdAt', 'DESC']];

  constructor(
    @InjectRepository(ScheduleModel)
    private readonly scheduleModel: Repository<ScheduleModel>,
  ) {}

  async save(item: ScheduleEntity): Promise<void> {
    await this.scheduleModel.save(item);
  }

  async delete(id: string): Promise<void> {
    await this.scheduleModel.softDelete(id);
  }

  async findByClientId(clientId: string): Promise<ScheduleEntity[]> {
    const data = await this.scheduleModel.find({
      where: {
        client: {
          id: clientId,
        },
      },
      relations: {
        client: true,
      },
    });

    return data.map((item) => scheduleTypeOrmToEntity(item));
  }

  async findByDateRange(options: {
    startDate: Date;
    endDate: Date;
    skip?: number;
    take?: number;
    order?: string[][];
  }): Promise<ScheduleEntity[]> {
    const {
      startDate,
      endDate,
      skip = this.defaultSkip,
      take = this.defaultTake,
      order = this.defaultOrder,
    } = options;

    const result = await this.scheduleModel.find({
      where: {
        startDate: MoreThanOrEqual(startDate),
        endDate: LessThanOrEqual(endDate),
      },
      relations: {
        client: true,
      },
      skip,
      take,
      order: order as FindOptionsOrder<ScheduleModel>,
    });

    return result.map((item) => scheduleTypeOrmToEntity(item));
  }

  async findById(id: string): Promise<ScheduleEntity> {
    const data = await this.scheduleModel.findOne({
      where: { id },
      relations: {
        client: true,
      },
    });

    if (!data) {
      return null;
    }

    return scheduleTypeOrmToEntity(data);
  }
}
