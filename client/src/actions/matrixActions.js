import {
  SET_MATRIX,
  SET_MATRIX_CELL,
  REQUEST_RANDOM_MATRIX,
  REQUEST_MATRIX_CELL_CHANGE,
} from '../constants/actionTypes';

export const setMatrix = matrix => ({
  type: SET_MATRIX,
  matrix,
});

export const setMatrixCell = (index, value) => ({
  type: SET_MATRIX_CELL,
  cell: {
    index,
    value,
  },
});

export const requestRandomMatrix = (rowCount = null, columnCount = null) => ({
  type: REQUEST_RANDOM_MATRIX,
  rowCount,
  columnCount,
});

export const requestMatrixCellChange = (index, value) => ({
  type: REQUEST_MATRIX_CELL_CHANGE,
  index,
  value,
});
