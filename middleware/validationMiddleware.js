const { ErrorConstructor } = require("../helpers/errors");
const {
  userLoginSchema,
  userRegisterSchema,
} = require("../helpers/validationSchemas/authValidation");
const {
  userCredentialsSchema,
  userCredentialsByIdSchema,
} = require("../helpers/validationSchemas/userValidation");

const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      throw new ErrorConstructor(
        400,
        validationResult.error.details[0].message
      );
    }
    next();
  };
};

// auth

const userRegisterValidation = validation(userRegisterSchema);
const userLoginValidation = validation(userLoginSchema);

// user

const userCredentialsValidation = validation(userCredentialsSchema);
const userCredentialsByIdValidation = validation(userCredentialsByIdSchema);

module.exports = {
  userLoginValidation,
  userRegisterValidation,
  userCredentialsValidation,
  userCredentialsByIdValidation,
};
