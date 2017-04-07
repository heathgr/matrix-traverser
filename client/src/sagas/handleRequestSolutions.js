import 'babel-polyfill';
import { takeLatest, put } from 'redux-saga/effects';
import { gotSolutions, failedToGetSolutions } from '../actions/solutionsActions';
import { REQUEST_SOLUTIONS, GOT_SOLUTIONs, FAILED_TO_GET_SOLUTIONs } from '../constants/actionTypes';

const getSolutions = function* () {
  try {
    yield put(gotSolutions('stuff'));
  } catch (error) {
    yield put(failedToGetSolutions('it did not work....', error));
  }
};

const handleRequesSolutions = function* () {
  yield takeLatest(REQUEST_SOLUTIONS, getSolutions);
};

export default handleRequesSolutions;
