const Joi = require('joi');

const requestSchema = Joi.object().keys({
  matrix: Joi.array().items(Joi.number().integer()).required(),
  columnCount: Joi.number().integer().min(0).required(),
});

const requestBodyValidator = (body) => {
  return Joi.validate(body, requestSchema);
};

module.exports = requestBodyValidator;
