/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
// the import path to MATRIX_TRAVERSAL_SOLVER_URL is handled by a webpack alias.
// this can confuse eslint

import axios from 'axios';
import { takeLatest, put, select } from 'redux-saga/effects';
import MATRIX_TRAVERSAL_SOLVER_URL from 'matrixTraversalSolverUrl';
import { gotSolutions, failedToGetSolutions, takingRequestSolutions } from '../actions/solutionsActions';
import { REQUEST_SOLUTIONS } from '../constants/actionTypes';
import { getMatrix } from '../reducers/root';

const getSolutions = function* () {
  try {
    const matrix = yield select(getMatrix); // TODO don't fail the request if row count is present.
    const requestMatrix = matrix.delete('rowCount').toJS();
    const solutions = yield axios.post(
      MATRIX_TRAVERSAL_SOLVER_URL,
      requestMatrix,
      { headers: { 'content-type': 'application/json' } },
    );
    yield put(gotSolutions(solutions.data));
  } catch (error) {
    yield put(failedToGetSolutions(error));
  }
};

const handleRequestSolutions = function* () {
  yield takeLatest(REQUEST_SOLUTIONS, getSolutions);
  yield put(takingRequestSolutions());
};

export default handleRequestSolutions;
