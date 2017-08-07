import { takeLatest, put } from 'redux-saga/effects';
import generateRandomMatrix from '../helpers/generateRandomMatrix';
import { setMatrix, takingRequestRandomMatrix } from '../actions/matrixActions';
import { requestSolutions, resetSolutions } from '../actions/solutionsActions';
import { REQUEST_RANDOM_MATRIX } from '../constants/actionTypes';

const handleRequestRandomMatrix = function* (action) {
  const newMatrix = generateRandomMatrix(action.rowCount, action.columnCount);

  yield put(setMatrix(newMatrix));
  yield put(resetSolutions());
  yield put(requestSolutions());
};

const takeRequestRandomMatrix = function* () {
  yield takeLatest(REQUEST_RANDOM_MATRIX, handleRequestRandomMatrix);
  yield put(takingRequestRandomMatrix());
};

export default takeRequestRandomMatrix;
