import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from './repository/schedule.repository';
import { ScheduleService } from './schedule.service';

@Module({
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    ScheduleRepository,
    {
      provide: 'ScheduleRepository',
      useClass: ScheduleRepository,
    },
  ],
  exports: [ScheduleService, ScheduleRepository, 'ScheduleRepository'],
})
export class ScheduleModule {}
