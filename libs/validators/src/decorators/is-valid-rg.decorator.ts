import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { IsValidRg } from '../is-valid-rg.validator';

@ValidatorConstraint({ name: 'isValidRGConstraint', async: false })
export class IsValidRGConstraint implements ValidatorConstraintInterface {
  validate(rg: string, _args: ValidationArguments) {
    return IsValidRg.execute(rg);
  }

  defaultMessage(args: ValidationArguments) {
    return 'rg must be valid';
  }
}
