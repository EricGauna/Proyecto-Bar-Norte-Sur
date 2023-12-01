const Joi = require("joi");

const createProblemasSchema = Joi.object({
  title: Joi.string()
    .min(4)
    .max(200)
    .required()
    .messages({}),
  description: Joi.string()
    .min(4)
    .max(5000)
    .required()
    .messages({}),
  ciudad: Joi.string()
    .min(4)
    .max(100)
    .required()
    .messages({}),
  barrio: Joi.string()
    .min(4)
    .max(100)
    .required()
    .messages({}),
});

module.exports = createProblemasSchema;
