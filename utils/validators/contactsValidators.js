const Joi = require("joi");

/**
 * Validate create contact data
 */
exports.createContactValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).alphanum().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.number().integer().required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

/**
 * Validate update contact data
 */
exports.updateContactValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).alphanum(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer(),
      favorite: Joi.boolean(),
    })
    .validate(data);
