import * as BaseJoi from '@hapi/joi';
import * as JoiDate from 'joi-date-extensions';

const Joi = BaseJoi.extend(JoiDate);

export const userCreateSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  phone: Joi.string().regex(/^(8-?|\+?7-?)?(\(?\d{3}\)?)-?(\d-?){6}\d$/),
  birthdate: Joi.date().format('DD.MM.YYYY'),
});

export const userUpdateSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30),
  phone: Joi.string().regex(/^(8-?|\+?7-?)?(\(?\d{3}\)?)-?(\d-?){6}\d$/),
  birthdate: Joi.date().format('DD.MM.YYYY'),
});
