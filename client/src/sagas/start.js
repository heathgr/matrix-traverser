import 'babel-polyfill';
import { fork, put } from 'redux-saga/effects';
import handleRequestMatrixSolution from './handleRequestMatrixSolution';
import { requestMatrixSolution } from '../actions/matrixSolutionActions';

const start = function* () {
  yield fork(handleRequestMatrixSolution);
  yield put(requestMatrixSolution({}));
};

export default start;
