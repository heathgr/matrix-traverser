import { takeLatest, put } from 'redux-saga/effects';
import generateRandomMatrix from '../helpers/generateRandomMatrix';
import { setMatrix } from '../actions/matrixActions';
import { requestSolutions } from '../actions/solutionsActions';
import { REQUEST_RANDOM_MATRIX } from '../constants/actionTypes';

const handleRequestRandomMatrix = function* () {
  const newMatrix = generateRandomMatrix();

  yield put(setMatrix(newMatrix));
  yield put(requestSolutions());
};

const takeRequestRandomMatrix = function* () {
  yield takeLatest(REQUEST_RANDOM_MATRIX, handleRequestRandomMatrix);
};

export default takeRequestRandomMatrix;
