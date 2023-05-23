const Joi = require("joi");

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required(),
});

const userRegisterSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  phone: Joi.string().required(),
});

module.exports = {
  userLoginSchema,
  userRegisterSchema,
};
