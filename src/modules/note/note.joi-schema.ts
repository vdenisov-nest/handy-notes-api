import * as Joi from '@hapi/joi';

export const noteCreateSchema = Joi.object().keys({
  userId: Joi.number().required(),
  title: Joi.string().min(3).max(30),
  text: Joi.string().min(10).max(50),
});

export const noteUpdateSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30),
  text: Joi.string().min(10).max(50),
});
