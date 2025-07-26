import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ScheduleEntity } from '../domain/entity/schedule/schedule.entity';
import { IScheduleRepository } from '../domain/repository/schedule.repository.interface';
import { ScheduleFactory } from '../domain/factory/schedule.factory';
import { IClientRepository } from '../domain/repository/client.repository.interface';
import { CreateScheduleInput } from './types/create-schedule.type';
import { UpdateScheduleInput } from './types/update-schedule.type';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @Inject('ScheduleRepository')
    private readonly scheduleRepository: IScheduleRepository,

    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async create(input: CreateScheduleInput): Promise<ScheduleDto> {
    try {
      const { client, endDate, startDate, billingType } = input;

      const clientSaved = await this.clientRepository.findById(client.id);

      if (!clientSaved) {
        throw new NotFoundException('Client not found');
      }

      const schedule = ScheduleFactory.create({
        client: clientSaved,
        endDate: new Date(endDate),
        startDate: new Date(startDate),
        billingType,
      });

      await this.checkIfAlreadyExistsScheduleForThisDate(schedule);

      this.logger.log('Creating schedule entity', schedule);

      await this.scheduleRepository.save(schedule);

      return new ScheduleDto(schedule);
    } catch (error) {
      this.logger.error('[create]', error);
      throw error;
    }
  }

  async update(input: UpdateScheduleInput) {
    try {
      const schedule = await this.scheduleRepository.findById(input.id);

      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }

      ScheduleFactory.update(input, schedule);

      await this.checkIfAlreadyExistsScheduleForThisDate(schedule);

      this.logger.log('Updating schedule entity');

      await this.scheduleRepository.save(schedule);

      return new ScheduleDto(schedule);
    } catch (error) {
      this.logger.error('[update]', error);
      throw error;
    }
  }

  private async checkIfAlreadyExistsScheduleForThisDate(
    schedule: ScheduleEntity,
  ): Promise<void> {
    const schedules = await this.scheduleRepository.findByDateRange({
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      take: 1,
    });

    const scheduleWithTheSameDate = schedules[0];

    if (scheduleWithTheSameDate && scheduleWithTheSameDate.id !== schedule.id) {
      throw new ConflictException('Already exists a schedule for this date');
    }
  }
}
