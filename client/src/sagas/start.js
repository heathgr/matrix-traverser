/** @module sagas/start */

import { fork, put } from 'redux-saga/effects';
import takeRequestSolutions from './takeRequestSolutions';
import takeRequestRandomMatrix from './takeRequestRandomMatrix';
import { requestRandomMatrix } from '../actions/matrixActions';
// import { requestSolutions } from '../actions/solutionsActions';

const start = function* () {
  yield fork(takeRequestSolutions);
  yield fork(takeRequestRandomMatrix);
  yield put(requestRandomMatrix());
};

/**
 * The start saga.  This saga gets run when the app gets loaded and is used for app initialization, forking other sagas, etc.
 * @return {undefined}
 */
export default start;
