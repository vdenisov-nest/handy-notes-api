import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// import * as Joi from '@hapi/joi';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = Joi.validate(value, this.schema);
    if (error) {
      const errorDetails = this._formatJoiErrors(error.details);
      throw new BadRequestException(`Validation failed: ${ errorDetails }`);
    }
    return value;
  }

  private _formatJoiErrors(errors: any[]) {
    // return errors.map(err => err.message).join(', ');
    return errors[0].message;
  }

}
