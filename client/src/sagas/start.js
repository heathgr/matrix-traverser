/** @module sagas/start */

import 'babel-polyfill';
import { fork, put } from 'redux-saga/effects';
import handleRequestMatrixSolution from './handleRequestMatrixSolution';
import { requestMatrixSolution } from '../actions/matrixSolutionActions';

const start = function* () {
  yield fork(handleRequestMatrixSolution);
  yield put(requestMatrixSolution({}));
};

/**
 * The start saga.  This saga gets run when the app gets loaded and is used for app initialization, forking other sagas, etc.
 * @return {undefined}
 */
export default start;
