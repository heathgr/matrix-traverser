import { Map } from 'immutable';
import {
  TOGGLE_CREATE_MATRIX_UI,
  TOGGLE_INTRODUCTION_UI,
  SET_CREATE_MATRIX_COLUMN_COUNT,
  SET_CREATE_MATRIX_ROW_COUNT,
} from '../constants/actionTypes';

export const initialUIState = Map({
  isCreateMatrixUIVisible: false,
  isIntroductionUIVisible: false,
  setCreateMatrixColumnCount: 0,
  setCreateMatrixRowCount: 0,
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
      return state.set('setCreateMatrixColumnCount', action.count);
    }
    case SET_CREATE_MATRIX_ROW_COUNT: {
      return state.set('setCreateMatrixRowCount', action.count);
    }
    default: {
      return state;
    }
  }
};

export const getIsCreateMatrixUIVisible = state => state.get('isCreateMatrixUIVisible');
export const getIsIntroductionUIVisible = state => state.get('isIntroductionUIVisible');
export const getCreateMatrixColumnCount = state => state.get('setCreateMatrixColumnCount');
export const getCreateMatrixRowCount = state => state.get('setCreateMatrixRowCount');

export default ui;
