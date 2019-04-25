import * as Joi from '@hapi/joi';

export const tagCreateSchema = Joi.object().keys({
  value: Joi.string().min(1).max(15),
});

export const tagUpdateSchema = Joi.object().keys({
  value: Joi.string().min(1).max(15),
});
