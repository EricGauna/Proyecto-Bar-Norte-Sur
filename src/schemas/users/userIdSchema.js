const Joi = require("joi");

const UserIdSchema = Joi.number()
  .positive()
  .required();

module.exports = UserIdSchema;
