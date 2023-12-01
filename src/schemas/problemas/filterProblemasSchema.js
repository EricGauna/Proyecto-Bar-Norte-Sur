const Joi = require("joi");

const filterProblemasSchema = Joi.object({
  title: Joi.string().max(200).messages({}),
  description: Joi.string()
    .max(5000)
    .messages({}),
  ciudad: Joi.string()
    .min(4)
    .max(100)
    .messages({}),
  barrio: Joi.string()
    .min(4)
    .max(100)
    .messages({}),
  estado: Joi.number()
});

module.exports = filterProblemasSchema;
