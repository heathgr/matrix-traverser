import { takeLatest, put } from 'redux-saga/effects';
import { setMatrixCell, takingRequestMatrixCellChange } from '../actions/matrixActions';
import { resetSolutions, requestSolutions } from '../actions/solutionsActions';
import { REQUEST_MATRIX_CELL_CHANGE } from '../constants/actionTypes';

const handleRequestMatrixCellChange = function* (action) {
  yield put(setMatrixCell(action.index, action.value));
  yield put(resetSolutions());
  yield put(requestSolutions());
};

const takeRequestMatrixCellChange = function* () {
  yield takeLatest(REQUEST_MATRIX_CELL_CHANGE, handleRequestMatrixCellChange);
  yield put(takingRequestMatrixCellChange());
};

export default takeRequestMatrixCellChange;
