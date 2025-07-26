import { IsValidCpf, IsValidRg } from '@app/validators';
import { isEmail, isMobilePhone } from 'class-validator';

import { BadRequestException } from '@nestjs/common';
import { ClientEntity } from '../client.entity';

export class ValidateBrazilianClient {
  private static readonly clientCountry: validator.MobilePhoneLocale = 'pt-BR';

  public static execute(client: ClientEntity) {
    this.validateCpf(client.cpf);
    this.validateRg(client.rg);
    this.validateEmail(client.email);
    this.validatePhone(client.phone);
  }

  private static validateCpf(cpf: string) {
    const isValid = IsValidCpf.execute(cpf);

    if (!isValid) {
      throw new BadRequestException('Invalid CPF');
    }
  }

  private static validateRg(rg: string) {
    const isValid = IsValidRg.execute(rg);

    if (!isValid) {
      throw new BadRequestException('Invalid RG');
    }
  }

  private static validateEmail(email: string) {
    const isValid = isEmail(email);

    if (!isValid) {
      throw new BadRequestException('Invalid e-mail');
    }
  }

  private static validatePhone(phone: string) {
    const isValid = isMobilePhone(phone, this.clientCountry);

    if (!isValid) {
      throw new BadRequestException('Invalid phone');
    }
  }
}
