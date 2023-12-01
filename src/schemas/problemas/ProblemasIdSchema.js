const Joi = require("joi");

const ProblemasIdSchema = Joi.number()
  .positive()
  .required();

module.exports = ProblemasIdSchema;
