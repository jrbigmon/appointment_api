import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import {
  ClientEntity,
  ScheduleEntity,
} from '../domain/entity/schedule/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { IScheduleRepository } from '../domain/repository/repository.interface';
import { ScheduleFactory } from '../domain/factory/schedule.factory';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @Inject('ScheduleRepository')
    private readonly scheduleRepository: IScheduleRepository,
  ) {}

  async create(input: CreateScheduleDto) {
    try {
      const { client, endDate, startDate, billingType } = input;

      const scheduleEntity = ScheduleFactory.create({
        client: new ClientEntity(client),
        endDate: new Date(endDate),
        startDate: new Date(startDate),
        billingType,
      });

      await this.checkIfAlreadyExistsScheduleForThisDate(scheduleEntity);

      this.logger.log('Creating schedule entity', scheduleEntity);

      return await this.scheduleRepository.create(scheduleEntity);
    } catch (error) {
      this.logger.error('Error executing schedule service', error);
      throw error;
    }
  }

  async findAll(): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.findAll();
  }

  private async checkIfAlreadyExistsScheduleForThisDate(
    schedule: ScheduleEntity,
  ): Promise<void> {
    const schedules = await this.scheduleRepository.findByDateRange(
      schedule.getStartDate(),
      schedule.getEndDate(),
    );

    if (schedules?.length > 0) {
      throw new ConflictException('Already exists a schedule for this date');
    }
  }
}
