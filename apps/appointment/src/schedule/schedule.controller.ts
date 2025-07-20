import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  findAllSchedules() {
    return this.scheduleService.findAll();
  }

  @Get('price/:id/:type')
  getPriceSchedule(@Param('id') id: string, @Param('type') type: 'a' | 'b') {
    return this.scheduleService.getPriceSchedule(id, type);
  }
}
