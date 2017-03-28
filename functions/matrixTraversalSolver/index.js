const requestBodyValidator = require('./requestBodyValidator');

const matrixTraversalSolver = (req, res) => {
  console.log('==========================================');
  console.log('starting!!!');
  const contentType = req.get('content-type');
  const requestMethod = req.method;
  const body = req.body;

  if (requestMethod !== 'POST') {
    res.status(405).send('Requests must use the POST method.');
    return;
  }
  if (contentType !== 'application/json') {
    res.status(400).send('Request content type must be "application/json".');
    return;
  }

  const isValid = requestBodyValidator(req.body);

  if (isValid.error) {
    const errorMessage = isValid.error.details.reduce(
      (prev, current) => `${prev}${current.message}\n`,
      ''
    );
    res.status(400).send(errorMessage);
    return;
  }

  res.status(200).send();
};

exports.matrixTraversalSolver = matrixTraversalSolver;
