# JOI ERROR MESSAGES

- Joi.required() => "any.required"

- Joi.string(), Joi.number(), Joi.date(), etc => "any.base"

- Joi.max(), Joi.min(), Joi.email(), etc => "type.restriction" EJEMPLOS:
  - Joi.string().max(10) => "string.max"
  - Joi.string().email() => "string.email"
  - Joi.number().min(18) => "number.min"
