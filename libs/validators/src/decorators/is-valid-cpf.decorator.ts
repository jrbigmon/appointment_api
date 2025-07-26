import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { IsValidCpf } from '../is-valid-cpf.validator';

@ValidatorConstraint({ name: 'isValidCPFConstraint', async: false })
export class IsValidCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string, _args: ValidationArguments) {
    return IsValidCpf.execute(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return 'cpf must be valid';
  }
}
