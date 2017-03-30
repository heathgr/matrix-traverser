/** @module index */

require('@google-cloud/debug-agent').start();
const requestBodyValidator = require('./src/requestBodyValidator');
const solver = require('./src/matrixTraversalSolver');

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
  const contentType = req.get('content-type');
  const { method, body } = req;

  if (method !== 'POST') {
    res.status(405).send('Requests must use the POST method.');
    return;
  }
  if (contentType !== 'application/json') {
    res.status(400).send('Request content type must be "application/json".');
    return;
  }

  const isValid = requestBodyValidator(body);

  if (isValid.error) {
    const errorMessage = isValid.error.details.reduce(
      (prev, current) => `${prev}${current.message}\n`,
      ''
    );
    res.status(400).send(errorMessage);
    return;
  }

  const { matrix, columnCount } = body;
  const isMatrixLengthValid = (matrix.length / columnCount) % 1 === 0;

  if (!isMatrixLengthValid) {
    res.status(400).send('Invalid Matrix.  The Matrix length must be a multiple of the column count.');
    return;
  }

  const result = solver(matrix, columnCount);

  res.status(200).json(result);
};

exports.matrixTraversalSolver = matrixTraversalSolver;
