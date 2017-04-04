import 'babel-polyfill';
import { takeLatest, put } from 'redux-saga/effects';
import { gotMatrixSolution, failedToGetMatrixSolution } from '../actions/matrixSolutionActions';
import { REQUEST_MATRIX_SOLUTION, GOT_MATRIX_SOLUTION, FAILED_TO_GET_MATRIX_SOLUTION } from '../constants/actionTypes';

const getMatrixSolution = function* () {
  try {
    console.log('get matrix solution');
    yield put(gotMatrixSolution('stuff'));
  } catch (error){
    yield put(failedToGetMatrixSolution('it did not work....', error));
  }
};

const handleRequestMatrixSolution = function* () {
  console.log('handeling request stuff...');
  yield takeLatest(REQUEST_MATRIX_SOLUTION, getMatrixSolution);
};

export default handleRequestMatrixSolution;
