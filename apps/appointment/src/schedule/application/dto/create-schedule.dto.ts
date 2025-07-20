import {
  IsDateString,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class ClientDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}

export class CreateScheduleDto {
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
