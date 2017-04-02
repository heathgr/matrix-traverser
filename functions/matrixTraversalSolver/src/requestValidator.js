/** @module requestValidator */

const Joi = require('joi');
const { INVALID_MATRIX_LENGTH } = require('./constants/errorMessages');

/**
 * A Joi validation schema that checkt to see if an object has "matrix" and "columCount" propeties.
 * The "matrix" property should be an array of integers.
 * The "columnCount" property should be an integer that is greater than zero.
 * @type {Object}
 */
const requestSchema = Joi.object().keys({
  cells: Joi
    .array()
    .items(
      Joi.number().integer()
    )
    .min(1)
    .max(100)
    .required(),
  columnCount: Joi
    .number()
    .integer()
    .min(1)
    .max(100)
    .required(),
});

const requestValidator = (body) => {
  const validation = Joi.validate(body, requestSchema);
  let error = validation.error === null ? null : validation.error.details[0].message;

  if (!error) {
    const { cells, columnCount } = body;
    const isMatrixLengthValid = (cells.length / columnCount) % 1 === 0;

    if (!isMatrixLengthValid) error = INVALID_MATRIX_LENGTH;
  }

  return error;
};

/**
 * Validates the JSON body of a matrix traversal request.  For more information, see the [Joi Api Documentation]{@link https://github.com/hapijs/joi/blob/master/API.md}
 * @param  {Object} body - The body of a matrix traversal request.
 * @return {Object} The result of a Joi validation function. An object containing error and value properties.
 */
module.exports = requestValidator;
