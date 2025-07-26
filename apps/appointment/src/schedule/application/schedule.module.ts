import { ClientModel } from './model/client.model';
import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleModel } from './model/schedule.model';
import { ScheduleRepositoryTypeORM } from './repository/schedule.repository.typeorm';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleModel, ClientModel])],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    ScheduleRepositoryTypeORM,
    {
      provide: 'ScheduleRepository',
      useClass: ScheduleRepositoryTypeORM,
    },
  ],
  exports: [ScheduleService, 'ScheduleRepository'],
})
export class ScheduleModule {}
