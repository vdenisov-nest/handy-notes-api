// import * as Joi from '@hapi/joi';
import * as Joi from 'joi';

export const tagCreateSchema = Joi.object().keys({
  value: Joi.string().min(1).max(15).required(),
});

export const tagUpdateSchema = Joi.object().keys({
  value: Joi.string().min(1).max(15),
});
