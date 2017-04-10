/**
 * @typedef {Object} cells
 *
 * @property {number} column An integer referencing the column the cell is on.
 * @property {number} row An integer referencing the row the cell is on.
 * @property {number} value An integer referencing the value of the cell.
 */

/**
 * @typedef {Object} matrix
 *
 * @static
 * @property {number} columnCount - An integer referencing the number of columns in the matrix.
 * @property {number} rowCount - An integer referencing the number of rows in the matrix.
 * @property {cells[]} cells - An array of matrix cells.
 */

/**
 * @typedef {Object} path
 *
 * @property {number[]} cells - An array of integers that defines a path.  Each array element is the index of a cell in a matrix object.
 * @property {boolean} isComplete - If set to true, significes that a path is complete and can no longer traverse any cells in the matrix.
 */

/**
 * @typedef {Object} solution
 *
 * @property {number[][]} solutions - The solution(s) to the matrix traversal. An individual solution will be array of indecies referencing cells in the matrix property.
 */

/**
 *  @typedef {object} simpleMatrix
 *
 * @property {number[]} cells - An array of integers.  The length of the array must be a multiple of the "columnCount" property.
 * @property {number} columnCount - The number of columns in the array.
 */

/** @module index */

require('@google-cloud/debug-agent').start();
const cors = require('cors');
const requestValidator = require('./src/requestValidator');
const solver = require('./src/matrixTraversalSolver');
const {
  BAD_METHOD,
  BAD_CONTENT_TYPE, // TODO get rid of bad content type
  INVALID_REQUEST_SCHEMA,
} = require('./src/constants/errorMessages');

const requestHandler = (req, res) => {
  const { method, body } = req;

  req.accepts('application/json');

  console.log('method', method);
  if (method !== 'POST') {
    res.status(405).send(BAD_METHOD);
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

const corsHandler = cors(); // TODO make this more secure

const matrixTraversalSolver = (req, res) => {
  corsHandler(req, res, () => {
    requestHandler(req, res);
  });
};

/**
 * @description A google cloud function that calculates a traversal path through the submitted matrix.
 * @param  {Object} req - Cloud Function request.  This script is expecting a request the meet the following criteria:
 * - The request must use the http POST method.
 * - The request must be a type of applicaiton/json.
 * - The request body must have a type of "simpleMatrix".
 * - The "matrix" property must be an aray of integers.
 * - The length of the "matrix" array must be a multiple of the "columnCount" property.
 * - The "columnCount" property must be an integer that is greater than one.
 * @param  {Object} res - Cloud Function response.  The response contains a JSON object of type {@link solution}.
 * @return {undefined}
 */
exports.matrixTraversalSolver = matrixTraversalSolver;
