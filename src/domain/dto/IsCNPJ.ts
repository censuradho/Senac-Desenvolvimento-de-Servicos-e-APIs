import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsCNPJ implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const validation = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;

    return validation.test(text)
  }

  defaultMessage(args: ValidationArguments) {
    console.log()
    // here you can provide default error message if validation failed
    return `field ${args.property} must be a valid CNPJ`;
  }
}