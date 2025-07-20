import { IRepository } from 'apps/appointment/shared/repository.interface';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { ScheduleEntity } from './entity/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { usecaseCalculatePrice } from './usecase/caculate-schedule-price.usecase';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @Inject('ScheduleRepository')
    private readonly scheduleRepository: IRepository<ScheduleEntity>,
  ) {}

  async create(input: CreateScheduleDto) {
    try {
      const { client, endDate, startDate } = input;

      const scheduleEntity = new ScheduleEntity({
        client,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      await this.checkIfAlreadyExistsScheduleForThisDate(scheduleEntity);

      this.logger.log('Creating schedule entity', scheduleEntity);

      await this.scheduleRepository.create(scheduleEntity);

      return scheduleEntity;
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
    const schedules = await this.scheduleRepository.findAll();

    const hasScheduleForThisDate = schedules.some(
      (s) => s.startDate <= schedule.endDate && s.endDate >= schedule.startDate,
    );

    if (hasScheduleForThisDate) {
      throw new ConflictException('Already exists a schedule for this date');
    }
  }

  async getPriceSchedule(
    scheduleId: string,
    type: 'a' | 'b',
  ): Promise<{
    price: number;
    pricePerHour: number;
  }> {
    const schedule = await this.scheduleRepository.findById(scheduleId);

    if (!schedule) {
      throw new ConflictException('Schedule not found');
    }

    return usecaseCalculatePrice(schedule, type);
  }
}
