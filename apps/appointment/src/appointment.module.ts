import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/application/schedule.module';

@Module({
  imports: [ScheduleModule],
})
export class AppointmentModule {}
