const Joi = require("joi");

const userCredentialsSchema = Joi.object()
  .keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phone: Joi.string().optional(),
    password: Joi.string().min(8).max(20).optional(),
  })
  .unknown(false);

const userCredentialsByIdSchema = Joi.object()
  .keys({
    firstName: Joi.string().min(5).max(20).optional(),
    lastName: Joi.string().min(5).max(20).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    role: Joi.string().optional(),
    supplies: Joi.string().optional(),
    banned: Joi.string().optional(),
  })
  .unknown(false);

module.exports = {
  userCredentialsSchema,
  userCredentialsByIdSchema,
};
