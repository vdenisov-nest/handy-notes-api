// import * as Joi from '@hapi/joi';
import * as Joi from 'joi';

export const noteCreateSchema = Joi.object().keys({
  userId: Joi.number().required(),
  title: Joi.string().min(3).max(30).required(),
  text: Joi.string().min(10).max(50).required(),
});

export const noteUpdateSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30),
  text: Joi.string().min(10).max(50),
});
