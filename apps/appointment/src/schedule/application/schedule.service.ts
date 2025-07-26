import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ScheduleEntity } from '../domain/entity/schedule/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { IScheduleRepository } from '../domain/repository/schedule.repository.interface';
import { ScheduleFactory } from '../domain/factory/schedule.factory';
import { IClientRepository } from '../domain/repository/client.repository.interface';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @Inject('ScheduleRepository')
    private readonly scheduleRepository: IScheduleRepository,

    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async create(input: CreateScheduleDto) {
    try {
      const { client, endDate, startDate, billingType } = input;

      const clientSaved = await this.clientRepository.findById(client.id);

      if (!clientSaved) {
        throw new NotFoundException('Client not found');
      }

      const scheduleEntity = ScheduleFactory.create({
        client: clientSaved,
        endDate: new Date(endDate),
        startDate: new Date(startDate),
        billingType,
      });

      await this.checkIfAlreadyExistsScheduleForThisDate(scheduleEntity);

      this.logger.log('Creating schedule entity', scheduleEntity);

      return await this.scheduleRepository.save(scheduleEntity);
    } catch (error) {
      this.logger.error('Error executing schedule service', error);
      throw error;
    }
  }

  private async checkIfAlreadyExistsScheduleForThisDate(
    schedule: ScheduleEntity,
  ): Promise<void> {
    const schedules = await this.scheduleRepository.findByDateRange({
      startDate: schedule.getStartDate(),
      endDate: schedule.getEndDate(),
      take: 1,
    });

    if (schedules?.length > 0) {
      throw new ConflictException('Already exists a schedule for this date');
    }
  }
}
