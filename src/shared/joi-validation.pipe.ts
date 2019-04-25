import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

import * as Joi from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const {
      error: validationError,
      value: validatedData,
    } = Joi.validate(value, this.schema);

    if (validationError) {
      const errorDetails = this._formatJoiErrors(validationError.details);
      const errorMessage = `Validation failed: ${ errorDetails } !!!`;
      throw new BadRequestException(errorMessage);
    }

    return validatedData;
  }

  private _formatJoiErrors(errors: any[]) {
    return errors.map(err => err.message).join(', ');
  }

}
