import axios from 'axios';
import { takeLatest, put, select } from 'redux-saga/effects';
import { gotSolutions, failedToGetSolutions } from '../actions/solutionsActions';
import { REQUEST_SOLUTIONS } from '../constants/actionTypes';
import { getSimpleMatrix } from '../reducers/root';

const getSolutions = function* () {
  try {
    const matrix = yield select(getSimpleMatrix);
    const solutions = yield axios.post(
      'http://localhost:8010/matrix-traversal/us-central1/matrixTraversalSolver',
      matrix,
      { headers: { 'content-type': 'application/json' } },
    );
    yield put(gotSolutions(solutions.data));
  } catch (error) {
    yield put(failedToGetSolutions(error));
  }
};

const handleRequesSolutions = function* () {
  yield takeLatest(REQUEST_SOLUTIONS, getSolutions);
};

export default handleRequesSolutions;
