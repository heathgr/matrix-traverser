import axios from 'axios';
import { takeLatest, put, select, call } from 'redux-saga/effects';
import { gotSolutions, failedToGetSolutions } from '../actions/solutionsActions';
import { REQUEST_SOLUTIONS, GOT_SOLUTIONs, FAILED_TO_GET_SOLUTIONs } from '../constants/actionTypes';
import { getSimpleMatrix } from '../reducers/root';

const getSolutions = function* () {
  try {
    const matrix = yield select(getSimpleMatrix);
    console.log('saga matrix', matrix);
    const solutions = yield axios.post(
      'http://localhost:8010/matrix-traversal/us-central1/matrixTraversalSolver',
      matrix,
      { headers: { 'content-type': 'application/json' } },
    );
    console.log('solutions', solutions.data);
    yield put(gotSolutions(solutions.data));
  } catch (error) {
    yield put(failedToGetSolutions('it did not work....', error));
  }
};

const handleRequesSolutions = function* () {
  yield takeLatest(REQUEST_SOLUTIONS, getSolutions);
};

export default handleRequesSolutions;
