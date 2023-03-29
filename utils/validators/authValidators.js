const Joi = require("joi");

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,112})/;

/**
 * Validate signup user data
 */
exports.signupUserValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).alphanum().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      subscription: Joi.string(),
      avatarURL: Joi.string(),
    })
    .validate(data);

/**
 * Login validator
 */
exports.loginUserValidation = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(112).required(),
    })
    .validate(data);
