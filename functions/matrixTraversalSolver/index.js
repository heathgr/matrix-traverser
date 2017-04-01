/** @module index */

require('@google-cloud/debug-agent').start();
const requestValidator = require('./src/requestValidator');
const solver = require('./src/matrixTraversalSolver');
const {
  BAD_METHOD,
  BAD_CONTENT_TYPE,
  INVALID_REQUEST_SCHEMA,
} = require('./src/constants/errorMessages');

/**
 * A google cloud function that calculates a traversal path through the submitted matrix.
 * @param  {Object} req - Cloud Function request.  This script is expecting a request the meet the following criteria:
 * - The request must use the http POST method.
 * - The request must be a type of applicaiton/json.
 * - The request body must contain a "matrix" property and a "columnCount" property.
 * - The "matrix" property must be an aray of integers.
 * - The length of the "matrix" array must be a multiple of the "columnCount" property.
 * - The "columnCount" property must be an integer that is greater than one.
 * @param  {Object} res - Cloud Function response.  The response contains a JSON object of type {@link solution}.
 * @return {null}
 */
const matrixTraversalSolver = (req, res) => {
  const contentType = req.get('content-type');;;
  const { method, body } = req;

  if (method !== 'POST') {
    res.status(405).send(BAD_METHOD);
    return;
  }
  if (contentType !== 'application/json') {
    res.status(400).send(BAD_CONTENT_TYPE);
    return;
  }

  const validationError = requestValidator(body);

  if (validationError) {
    res.status(400).send(`${INVALID_REQUEST_SCHEMA}${validationError}`);
    return;
  }

  const result = solver(body);

  res.status(200).json(result);
};

exports.matrixTraversalSolver = matrixTraversalSolver;
