import { Map } from 'immutable';
import {
  TOGGLE_CREATE_MATRIX_UI,
  TOGGLE_INTRODUCTION_UI,
  SET_CREATE_MATRIX_COLUMN_COUNT,
  SET_CREATE_MATRIX_ROW_COUNT,
} from '../constants/actionTypes';

export const initialUIState = Map({
  isCreateMatrixUIVisible: false,
  isIntroductionUIVisible: true,
  createMatrixColumnCount: 0,
  createMatrixRowCount: 0,
});

const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_MATRIX_UI: {
      return state.set('isCreateMatrixUIVisible', !state.get('isCreateMatrixUIVisible'));
    }
    case TOGGLE_INTRODUCTION_UI: {
      return state.set('isIntroductionUIVisible', !state.get('isIntroductionUIVisible'));
    }
    case SET_CREATE_MATRIX_COLUMN_COUNT: {
      return state.set('createMatrixColumnCount', action.count);
    }
    case SET_CREATE_MATRIX_ROW_COUNT: {
      return state.set('createMatrixRowCount', action.count);
    }
    default: {
      return state;
    }
  }
};

export const getIsCreateMatrixUIVisible = state => state.get('isCreateMatrixUIVisible');
export const getIsIntroductionUIVisible = state => state.get('isIntroductionUIVisible');
export const getCreateMatrixColumnCount = state => state.get('createMatrixColumnCount');
export const getCreateMatrixRowCount = state => state.get('createMatrixRowCount');

export default ui;
