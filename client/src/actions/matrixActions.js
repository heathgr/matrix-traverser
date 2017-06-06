import {
  SET_MATRIX,
  SET_MATRIX_CELL,
  REQUEST_RANDOM_MATRIX,
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

export const requestRandomMatrix = () => ({
  type: REQUEST_RANDOM_MATRIX,
});
