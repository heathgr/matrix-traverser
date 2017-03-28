const requestBodyValidator = require('./requestBodyValidator');
const solver = require('./matrixTraversalSolver');

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

  res.status(200).send(result);
};

exports.matrixTraversalSolver = matrixTraversalSolver;
