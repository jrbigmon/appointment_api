import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import {
  IsValidCPFConstraint,
  IsValidRGConstraint,
} from '@app/validators/decorators';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @Validate(IsValidCPFConstraint)
  @IsNotEmpty()
  cpf: string;

  @Validate(IsValidRGConstraint)
  @IsNotEmpty()
  rg: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
