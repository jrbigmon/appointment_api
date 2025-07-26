import { ClientModule } from './client/application/client.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/application/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule,
    ClientModule,
    DatabaseModule,
  ],
})
export class AppointmentModule {}
