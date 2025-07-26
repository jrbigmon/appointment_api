import { ClientModel } from './model/client.model';
import { ClientRepositoryTypeORM } from './repository/client.repository.typeorm';
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
    ClientRepositoryTypeORM,
    {
      provide: 'ScheduleRepository',
      useClass: ScheduleRepositoryTypeORM,
    },
    {
      provide: 'ClientRepository',
      useClass: ClientRepositoryTypeORM,
    },
  ],
})
export class ScheduleModule {}
