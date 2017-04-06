import { SET_MATRIX, SET_MATRIX_CELL } from '../constants/actionTypes';

export const setMatrix = matrix => ({
  type: SET_MATRIX,
  matrix,
});

export const setMatrixCell = (row, column, value) => ({
  type: SET_MATRIX_CELL,
  cell: {
    row,
    column,
    value,
  },
});
