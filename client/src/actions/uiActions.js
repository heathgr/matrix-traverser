import {
  TOGGLE_CREATE_MATRIX_UI,
  TOGGLE_INTRODUCTION_UI,
  SET_CREATE_MATRIX_ROW_COUNT,
  SET_CREATE_MATRIX_COLUMN_COUNT,
} from '../constants/actionTypes';

export const toggleCreateMatrixUI = () => ({
  type: TOGGLE_CREATE_MATRIX_UI,
});

export const toggleIntroductionUI = () => ({
  type: TOGGLE_INTRODUCTION_UI,
});


export const setCreateMatrixRowCount = count => ({
  type: SET_CREATE_MATRIX_ROW_COUNT,
  count,
});

export const setCreateMatrixColumnCount = count => ({
  type: SET_CREATE_MATRIX_COLUMN_COUNT,
  count,
});
